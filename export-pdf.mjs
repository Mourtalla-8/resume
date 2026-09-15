import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = 9876;
const storageKey = "resume-language";
const resumeWidthPx = 794;
const pdfOutputs = {
  en: join(root, "Resume_Mourtalla_Toure_Software_Engineer.pdf"),
  fr: join(root, "Resume_Mourtalla_Toure_Ingenieur_Logiciel.pdf"),
};
const bottomBufferPx = 0;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((request, response) => {
      const pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
      const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
      const filePath = join(root, relativePath);

      try {
        const data = readFileSync(filePath);
        response.writeHead(200, {
          "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
        });
        response.end(data);
      } catch {
        response.writeHead(404);
        response.end("Not found");
      }
    });

    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function preparePage(page) {
  await page.evaluate((resumeWidthPx) => {
    document.querySelectorAll(".name-line").forEach((line) => {
      line.textContent = line.dataset.final || line.textContent;
    });

    const nameEl = document.getElementById("cv-name");
    if (nameEl?._cancelScramble) {
      nameEl._cancelScramble();
    }
    nameEl?.classList.remove("is-scrambling");

    document.querySelectorAll(".download-fab, .language-toggle, .skip-link").forEach((element) => {
      element.remove();
    });

    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#fff";
    document.body.style.minHeight = "auto";
    document.body.style.display = "block";
    document.body.style.zoom = "0.82";
    document.body.style.width = "100%";

    const main = document.querySelector(".resume-main");
    if (main) {
      main.style.margin = "0";
      main.style.padding = "0";
      main.style.width = "auto";
      main.style.display = "block";
    }

    const container = document.querySelector(".container");
    if (container) {
      const header = container.querySelector(".header");
      const education = container.querySelector(".education");
      const projects = container.querySelector(".projects");
      const summary = container.querySelector(".summary");
      const strengths = container.querySelector(".strengths");
      const skills = container.querySelector(".skills");
      const languages = container.querySelector(".languages");
      const interests = container.querySelector(".interests");

      const createColumn = (className, children) => {
        const column = document.createElement("div");
        column.className = className;
        children.filter(Boolean).forEach((child) => column.appendChild(child));
        return column;
      };

      const pageOne = document.createElement("div");
      pageOne.className = "container pdf-page";
      pageOne.append(
        createColumn("left", [
          createColumn("left-up", [summary]),
          createColumn("left-down", [skills]),
        ]),
        createColumn("right", [header, education])
      );

      const pageTwo = document.createElement("div");
      pageTwo.className = "container pdf-page";
      pageTwo.append(
        createColumn("left", [
          createColumn("left-down", [strengths, languages, interests]),
        ]),
        createColumn("right", [projects])
      );

      const documentRoot = document.createElement("div");
      documentRoot.className = "pdf-document";
      documentRoot.append(pageOne, pageTwo);
      container.replaceWith(documentRoot);

    }
  }, resumeWidthPx);

  await sleep(400);
}

async function measureContainer(page) {
  return page.evaluate(({ bottomBufferPx, resumeWidthPx }) => {
    const container = document.querySelector(".pdf-document");
    if (!container) {
      throw new Error("Resume container not found");
    }

    container.style.overflow = "visible";

    const containerRect = container.getBoundingClientRect();
    let maxBottom = containerRect.top;

    container.querySelectorAll("*").forEach((element) => {
      const styles = window.getComputedStyle(element);
      if (styles.display === "none" || styles.visibility === "hidden") {
        return;
      }

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        return;
      }

      maxBottom = Math.max(maxBottom, rect.bottom);
    });

    const measuredHeight = Math.ceil(maxBottom - containerRect.top);
    const height = Math.max(
      Math.ceil(container.scrollHeight),
      Math.ceil(container.offsetHeight),
      measuredHeight
    ) + bottomBufferPx;

    return {
      width: Math.ceil(containerRect.width),
      height,
    };
  }, { bottomBufferPx, resumeWidthPx });
}

async function exportPdfForLanguage(browser, port, language, output) {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(
    (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Ignore storage errors in headless export.
      }
    },
    storageKey,
    language
  );

  try {
    await page.setViewport({
      width: resumeWidthPx,
      height: 1123,
      deviceScaleFactor: 1,
    });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.emulateMediaType("print");
    await preparePage(page);

    const { width, height } = await measureContainer(page);

    await page.pdf({
      path: output,
      printBackground: true,
      format: "A4",
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });

    console.log(`PDF exported (${language}): ${output} (${width}x${height}px)`);
  } finally {
    await page.close();
  }
}

async function exportPdf() {
  const requestedLanguage = process.argv.find((arg) => arg.startsWith("--lang="))?.split("=")[1];
  const languages = requestedLanguage ? [requestedLanguage] : ["en", "fr"];
  const server = await startServer();
  let browser;

  try {
    browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
    });

    for (const language of languages) {
      const output = pdfOutputs[language];
      if (!output) {
        throw new Error(`Unsupported language: ${language}`);
      }

      await exportPdfForLanguage(browser, port, language, output);
    }
  } finally {
    await browser?.close();
    server.close();
  }
}

exportPdf().catch((error) => {
  console.error(error);
  process.exit(1);
});

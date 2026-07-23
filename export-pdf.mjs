import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = 9876;
const storageKey = "resume-language";
const resumeWidthPx = 750;
const pdfOutputs = {
  en: join(root, "Resume_Mourtalla_Toure_Software_Engineer.pdf"),
  fr: join(root, "Resume_Mourtalla_Toure_Ingenieur_Logiciel.pdf"),
};
const bottomBufferPx = 40;
const viewportPaddingPx = 80;

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

    const main = document.querySelector(".resume-main");
    if (main) {
      main.style.margin = "0";
      main.style.padding = "0";
      main.style.width = "auto";
      main.style.display = "block";
    }

    const container = document.querySelector(".container");
    if (container) {
      container.style.margin = "0";
      container.style.boxShadow = "none";
      container.style.overflow = "visible";
      container.style.width = `${resumeWidthPx}px`;
    }
  }, resumeWidthPx);

  await sleep(400);
}

async function measureContainer(page) {
  return page.evaluate(({ bottomBufferPx, resumeWidthPx }) => {
    const container = document.querySelector(".container");
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
      width: Math.max(Math.ceil(containerRect.width), resumeWidthPx),
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
      height: 2200,
      deviceScaleFactor: 1,
    });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.emulateMediaType("screen");
    await preparePage(page);

    const { width, height } = await measureContainer(page);

    await page.setViewport({
      width,
      height: height + viewportPaddingPx,
      deviceScaleFactor: 1,
    });
    await preparePage(page);

    await page.pdf({
      path: output,
      printBackground: true,
      width: `${width}px`,
      height: `${height}px`,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      pageRanges: "1",
      preferCSSPageSize: false,
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

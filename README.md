# Resume — Mourtalla Toure

Personal resume built with HTML and CSS. Open `index.html` in a browser or use the download button to save the static A4 PDF.

## Files

| File | Role |
|------|------|
| `index.html` | Content and structure |
| `style.css` | Layout, typography, responsive rules |
| `scramble.js` | Name animation on the header |
| `language.js` | English/French language toggle |
| `Resume_Mourtalla_Toure_Software_Engineer.pdf` | Static A4 downloadable resume in English |
| `Resume_Mourtalla_Toure_Ingenieur_Logiciel.pdf` | Static A4 downloadable resume in French |

## Local preview

No build step. Serve the folder or open `index.html` directly:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## PDF export

Generate both language versions as portrait A4 PDFs with readable typography and print margins:

```bash
node export-pdf.mjs
```

The visual style is professional and modern, with a restrained accent color, clear section hierarchy, and no photo requirement.
The exporter uses symmetric A4 margins defined by the print stylesheet, applies a dedicated two-column PDF flow, and places the profile, skills, and education on page one. Strengths, languages, interests, and projects are grouped on page two.

### PDF maintenance

The PDF exporter uses `puppeteer-core` and the Chromium executable configured in `export-pdf.mjs`. If the dependency is not installed locally, install it temporarily before exporting:

```bash
npm install --no-save --no-package-lock puppeteer-core
node export-pdf.mjs
rm -rf node_modules
```

The generated files are:

- `Resume_Mourtalla_Toure_Software_Engineer.pdf`
- `Resume_Mourtalla_Toure_Ingenieur_Logiciel.pdf`

#### Change the theme

The web and PDF versions use the same theme color. Change `--resume-theme` in the top-level `:root` block:

```css
:root {
  --resume-theme: #007979;
}
```

The print stylesheet keeps the same theme value and only overrides typography and pagination-related settings. Accent backgrounds, borders, links, focus colors, language underlines, and related derived colors are derived from this variable in both the browser and PDF.

#### Change PDF typography

Still inside `@media print`, adjust these variables:

```css
--fs-xs: 16px;
--fs-sm: 17px;
--fs-base: 17px;
--fs-md: 18px;
--fs-lg: 19px;
--fs-name: clamp(38px, 7vw, 48px);
```

The print-specific selectors below that block control secondary text, line heights, education spacing, and project-link spacing.

#### Change PDF layout and pagination

Edit `preparePage()` in `export-pdf.mjs` to change which sections appear on each page. The current layout is:

- page 1: summary, skills, header, education;
- page 2: strengths, languages, interests, projects.

The following exporter settings affect the final scale and dimensions:

- `document.body.style.zoom`: PDF content scale;
- `@page` in `style.css`: A4 page size and margins;
- `.pdf-page`, `.left`, `.right`, and print rules in `style.css`: columns, spacing, and page flow;
- `break-inside`, `break-before`, and `break-after`: section pagination behavior.

After any PDF change, validate the output:

```bash
node --check export-pdf.mjs
node --check language.js
git diff --check
pdfinfo Resume_Mourtalla_Toure_Ingenieur_Logiciel.pdf | grep -E 'Pages|Page size'
pdfinfo Resume_Mourtalla_Toure_Software_Engineer.pdf | grep -E 'Pages|Page size'
pdftotext -layout Resume_Mourtalla_Toure_Ingenieur_Logiciel.pdf -
pdftotext -layout Resume_Mourtalla_Toure_Software_Engineer.pdf -
```

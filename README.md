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

# Qifeng Yuan — academic homepage

A static, responsive homepage with three sections: a one-paragraph profile,
News, and Publications. No build tools, framework, external fonts, or analytics.

## Contact links

The profile shows three inline SVG icons: **Email**, **CV**, and **LinkedIn**.
They have accessible names, hover titles, and 44 × 44 px click/tap targets.
Edit their destinations in `index.html`; no icon font or external library is needed.
The LinkedIn destination is taken from the owner's supplied CV.

## Update your photograph

Replace `assets/portrait.png` with a real PNG. Use a **3:4 width-to-height ratio**,
for example 900 × 1200 px. It displays at 240 × 320 px on a wide screen and scales
down on smaller screens. CSS uses `object-fit: cover` so the photo never stretches.
The homepage now uses the owner's newly uploaded PNG. The older
`assets/portrait.jpg` and `assets/profession.jpg` are not modified by this update.

## Add or replace your CV

Upload your public PDF to **`assets/resume.pdf`**. Keep the spelling and case exact.
The CV icon links directly to the owner's uploaded `assets/resume.pdf` and opens
it in a new tab. The link also works when JavaScript is disabled.
The PDF itself is preserved unchanged by this update.

In the GitHub repository, open `assets`, choose **Add file → Upload files**,
and upload `resume.pdf` and/or `portrait.png`. Updating an existing filename replaces
that file in the new commit. Use a public-safe CV: the published file is public.

## Edit the profile or News

Edit `index.html`. Keep the biography as a single `<p class="biography">`.
In News, copy an existing `<li>` and update both the visible date and the
machine-readable `<time datetime="YYYY-MM-DD">`. Put the newest item first.

## Add publications

`publications.json` is intentionally `[]`. There are no example publications or
“coming soon” messages on the page. To add a real paper, use this structure:

```json
[
  {
    "title": "Your paper title",
    "authors": "Author One, Qifeng Yuan, Author Three",
    "venue": "Conference or journal, year",
    "pdf": "assets/papers/paper.pdf",
    "code": "https://github.com/owner/repository"
  }
]
```

`title` is required. `authors` and `venue` are optional text. `pdf` and `code`
are independently optional: omit either field or leave it empty to hide its
link. Only **PDF** and **Code** links are rendered; no Project, Poster, Slides,
Video, or other buttons are added. Relative paths and HTTP(S) URLs are supported.
No HTML from the data file is executed.

## Preview locally

From the repository root:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. A local HTTP server is needed for publication data;
the profile, contact links, and News do not depend on JavaScript.
All asset paths are relative, so the site works at a domain root or a project
subdirectory without changing URLs. Keep the existing GitHub Pages configuration.

## Files

- `index.html`: profile, contact icons, and News; Publications container.
- `styles.css`: white background, blue links, responsive 3:4 portrait layout.
- `script.js`: PDF/Code-only publication rendering.
- `publications.json`: publication records (currently empty).
- `assets/portrait.png`: replaceable portrait.
- `assets/resume.pdf`: public CV uploaded by the site owner.

The former photo wall, courses, education cards, and experience sections are not
shown on the homepage. Existing assets are not deleted by this update.

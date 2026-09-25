# Qifeng Yuan — academic homepage

A static, responsive homepage with three sections: a one-paragraph profile,
News, and Publications. No build tools, framework, external fonts, or analytics.

## Update your photograph

Replace `assets/portrait.jpg` with a real JPEG. Use a **3:4 width-to-height ratio**,
for example 900 × 1200 px. It displays at 240 × 320 px on a wide screen and scales
down on smaller screens. CSS uses `object-fit: cover` so the photo never stretches.
The initial `portrait.jpg` is a copy of the existing `assets/profession.jpg`;
the original and all photo-wall assets are preserved.

## Add or replace your CV

Upload your public PDF to **`assets/cv.pdf`**. Keep the spelling and case exact.
The CV control automatically becomes a blue link when the PDF is available,
and opens it in a new tab. Until then it is inactive, so it cannot lead to a 404.
The PDF itself has not been added in this redesign commit.

In the GitHub repository, open `assets`, choose **Add file → Upload files**,
and upload `cv.pdf` and/or `portrait.jpg`. Updating an existing filename replaces
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

Open `http://localhost:8000`. A local HTTP server is needed for the optional CV
check and publication data; the main profile and News do not depend on JavaScript.
All asset paths are relative, so the site works at a domain root or a project
subdirectory without changing URLs. Keep the existing GitHub Pages configuration.

## Files

- `index.html`: profile and News; Publications container.
- `styles.css`: white background, blue links, responsive 3:4 portrait layout.
- `script.js`: CV availability check and PDF/Code-only publication rendering.
- `publications.json`: publication records (currently empty).
- `assets/portrait.jpg`: replaceable portrait.
- `assets/cv.pdf`: public CV, to be uploaded by the site owner.

The former photo wall, courses, education cards, and experience sections are not
shown on the homepage. Their existing data and images remain in the repository.

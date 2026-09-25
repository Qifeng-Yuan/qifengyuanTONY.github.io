"use strict";

// The page itself is static. JavaScript only enables an uploaded CV and
// renders optional publications without inserting untrusted HTML.
async function enableCVLink() {
  const link = document.getElementById("cv-link");
  if (!link) return;

  const path = link.dataset.cvPath;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(path, {
      method: "HEAD",
      cache: "no-cache",
      signal: controller.signal
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !/application\/(pdf|octet-stream)/i.test(contentType)) return;
    link.href = path;
    link.removeAttribute("aria-disabled");
    link.title = "Curriculum vitae (PDF, opens in a new tab)";
  } catch {
    // Keep CV inactive until the public PDF is uploaded; never send visitors to a 404.
  } finally {
    clearTimeout(timeout);
  }
}

function publicationURL(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim(), document.baseURI);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function publicationText(tag, value, className) {
  const element = document.createElement(tag);
  element.textContent = value;
  if (className) element.className = className;
  return element;
}

async function loadPublications() {
  const container = document.getElementById("publication-list");
  if (!container) return;

  try {
    const response = await fetch("publications.json", { cache: "no-cache" });
    if (!response.ok) return;
    const publications = await response.json();
    if (!Array.isArray(publications)) return;

    const fragment = document.createDocumentFragment();
    for (const paper of publications) {
      if (!paper || typeof paper.title !== "string" || !paper.title.trim()) continue;
      const article = document.createElement("article");
      article.className = "publication";
      article.append(publicationText("h3", paper.title));
      if (typeof paper.authors === "string" && paper.authors.trim()) {
        article.append(publicationText("p", paper.authors));
      }
      if (typeof paper.venue === "string" && paper.venue.trim()) {
        article.append(publicationText("p", paper.venue, "publication-venue"));
      }

      const links = document.createElement("div");
      links.className = "publication-links";
      for (const [key, label] of [["pdf", "PDF"], ["code", "Code"]]) {
        const href = publicationURL(paper[key]);
        if (!href) continue;
        const link = publicationText("a", label);
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        links.append(link);
      }
      if (links.childElementCount) article.append(links);
      fragment.append(article);
    }
    container.replaceChildren(fragment);
  } catch {
    // An empty or temporarily unavailable publication list has no visible placeholder.
  }
}

void enableCVLink();
void loadPublications();

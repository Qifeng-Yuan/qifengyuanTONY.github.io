"use strict";

// Profile, contact links, and News are static. JavaScript only renders
// optional publications without inserting untrusted HTML.
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

void loadPublications();

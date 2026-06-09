async function loadPhotoWall() {
  const wall = document.querySelector("#photo-wall");
  if (!wall) return;

  try {
    const response = await fetch("photos.jsonl");
    if (!response.ok) throw new Error(`Failed to load photos.jsonl: ${response.status}`);
    const text = await response.text();
    const photos = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line));

    wall.innerHTML = photos.map((photo) => `
      <figure class="photo-card">
        <img src="${photo.src}" alt="${photo.alt || photo.caption}" loading="lazy">
        <figcaption class="photo-caption">
          <strong>${photo.location}</strong>
          <span>${photo.caption}</span>
        </figcaption>
      </figure>
    `).join("");
  } catch (error) {
    wall.innerHTML = `<p class="photo-error">Photos are being prepared.</p>`;
    console.error(error);
  }
}

loadPhotoWall();

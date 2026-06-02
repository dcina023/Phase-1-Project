const imageMenu = document.querySelector(".image-menu");
const detailsSection = document.querySelector(".item-details-container");

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/posts")
    .then((res) => {
      if (!res.ok) throw new Error("Backend server error");
      return res.json();
    })
    .then((data) => {
      console.log("Data received successfully:", data);
      data.forEach((photo) => {
        renderImages(photo);
      });
    })
    .catch((err) => console.error("Fetch failed:", err));

  function renderImages(photo) {
    const linkElement = document.createElement("a");
    linkElement.href = "#";

    const imgElement = document.createElement("img");

    imgElement.src = photo.src;

    imgElement.alt = photo.title;
    imgElement.className = "grid-photo";

    imgElement.addEventListener("click", (e) => {
      console.log("clicked");

      const titleEl = document.createElement("h2");
      titleEl.textContent = photo.title;

      const captionEl = document.createElement("p");
      captionEl.textContent = photo.caption;

      const likesEl = document.createElement("span");
      likesEl.textContent = `Likes: ${photo.likes}`;

      const displayImg = document.createElement("img");
      displayImg.src = photo.src;
      displayImg.alt = photo.title;

      detailsSection.replaceChildren(titleEl, captionEl, likesEl, displayImg);
    });

    linkElement.appendChild(imgElement);
    imageMenu.appendChild(linkElement);
  }
});

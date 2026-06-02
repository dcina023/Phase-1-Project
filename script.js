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

  function likesComponent(photo) {
    let count = photo.likesCount || 0;

    const likesDisplay = document.querySelector(".like-count");
    const likesBtn = document.querySelector(".like-button");

    if (!likesDisplay || !likesBtn) {
      console.error(
        "Critical Error: HTML elements for likes do not exist in the DOM!",
      );
      return;
    }

    likesDisplay.textContent = count;
    likesBtn.textContent = "👍 Like";
    likesBtn.classList.remove("liked");

    const newLikesBtn = likesBtn.cloneNode(true);
    likesBtn.parentNode.replaceChild(newLikesBtn, likesBtn);

    newLikesBtn.addEventListener("click", () => {
      count++;
      newLikesBtn.classList.add("liked");
      newLikesBtn.innerText = "❤️ Liked";
      likesDisplay.textContent = count;
    });
  }

  function renderImages(photo) {
    const linkElement = document.createElement("a");
    linkElement.href = "#";

    const imgElement = document.createElement("img");
    imgElement.src = photo.src;
    imgElement.alt = photo.title;
    imgElement.className = "grid-photo";

    imgElement.addEventListener("click", (e) => {
      e.preventDefault();

      const titleEl = document.createElement("h2");
      titleEl.textContent = photo.title;

      const captionEl = document.createElement("p");
      captionEl.textContent = photo.caption;

      const displayImg = document.createElement("img");
      displayImg.src = photo.src;
      displayImg.alt = photo.title;

      const likesWrapper = document.querySelector(".likes-wrapper");

      detailsSection.replaceChildren(titleEl, captionEl, displayImg);

      if (likesWrapper) {
        detailsSection.appendChild(likesWrapper);
      }

      likesComponent(photo);
    });

    linkElement.appendChild(imgElement);
    imageMenu.appendChild(linkElement);
  }
});

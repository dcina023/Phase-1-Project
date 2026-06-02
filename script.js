const url = "http://localhost:3000/posts";
const imageMenu = document.querySelector(".image-menu");
const detailsSection = document.querySelector(".item-details-container");
const userForm = document.querySelector("#user-form");

document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
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
      displayImg.className = "interactive-focus image"

      displayImg.addEventListener("mousemove", (e) => {
       console.log("mousemove")
        const rect = displayImg.getBoundingClientRect()

       const x = (e.clientX - rect.left) / rect.width - 0.5
       const y = (e.clientY - rect.top) / rect.height - 0.5

       const maxRotateX = -y * 20
       const maxRotateY = x * 20

       displayImg.style.transform = `perspective(1000px) rotateX(${maxRotateX}deg) rotateY(${maxRotateY}deg) scale3d(1.05, 1.05, 1.05)`
      });

      displayImg.addEventListener("mouseleave", (e) => {
        displayImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      });

      const likesWrapper = document.querySelector(".likes-wrapper");
      const outputDiv = document.querySelector("#output")

      detailsSection.replaceChildren(titleEl, captionEl, displayImg);

      if (likesWrapper) {
        detailsSection.appendChild(likesWrapper);
      }
      if (userForm) {
        detailsSection.appendChild(userForm);
      }
      if (outputDiv) {
        detailsSection.appendChild(outputDiv);
      }
      likesComponent(photo);
    });

    linkElement.appendChild(imgElement);
    imageMenu.appendChild(linkElement);
  }

  function addUserContent(newContent) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContent),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save data");
        return res.json();
      })
      .then((savedPhoto) => {
        renderImages(savedPhoto);
      })
      .catch((err) => console.error("Error adding post:", err));
  }

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(userForm);

    const newContent = {
      title: formData.get("title"),
      src: formData.get("src"),
      caption: formData.get("caption"),
      likesCount: 0,
    };

    addUserContent(newContent);
    userForm.reset();
  });
});

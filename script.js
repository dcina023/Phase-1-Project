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
      data.forEach((post) => renderImages(post));
    })
    .catch((err) => console.error("Fetch failed:", err));

  function createElements(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.assign(element, attributes);
    return element;
  }

  function renderImages(post) {
    const linkElement = createElements("a", { href: "#" });
    const imgElement = createElements("img", { src: post.src, alt: post.title, className: "grid-photo",});

    imgElement.addEventListener("click", (e) => {
      e.preventDefault();
     const titleElement = createElements("h2", { textContent: post.title })

     const captionElement = createElements("p", { textContent: post.caption })
      
     const displayImg = createElements("img", { src: post.src, alt: post.title, className: "interactive-focus image" });

      displayImg.addEventListener("mousemove", (e) => {
        const rect = displayImg.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const maxRotateX = -y * 20;
        const maxRotateY = x * 20;
        displayImg.style.transform = `perspective(1000px) rotateX(${maxRotateX}deg) rotateY(${maxRotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      displayImg.addEventListener("mouseleave", () => {
        displayImg.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });

      const likesWrapper = document.querySelector(".likes-wrapper");
      const outputDiv = document.querySelector("#output");

      detailsSection.replaceChildren(titleElement, captionElement, displayImg);
      if (likesWrapper) likesComponent(post, likesWrapper);
      if (userForm) detailsSection.appendChild(userForm);
      if (outputDiv) detailsSection.appendChild(outputDiv);
    });

    linkElement.appendChild(imgElement);
    imageMenu.appendChild(linkElement);
  }

    function likesComponent(postData, likesWrapper) {
      let count = postData.likesCount || 0;
      const likesDisplay = likesWrapper.querySelector(".like-count");
      const likesBtn = likesWrapper.querySelector(".like-button");

      detailsSection.appendChild(likesWrapper);
      likesWrapper.classList.remove("hidden");
      likesDisplay.textContent = count;

      const newLikesBtn = likesBtn.cloneNode(true);
      newLikesBtn.classList.remove("hidden", "liked");
      newLikesBtn.innerText = "Like";
      likesBtn.replaceWith(newLikesBtn);

      newLikesBtn.addEventListener("click", () => {
        count++;
        updateLikes(postData.id, count)
          .then(() => {
            newLikesBtn.classList.add("liked");
            newLikesBtn.innerText = "❤️";
            likesDisplay.textContent = count;
          })
          .catch((err) => console.error("Fetch failed:", err));
      });

     function updateLikes(id, newCount) {
        return fetch(`${url}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ likesCount: newCount }),
        }).then((res) => {
          if (!res.ok) throw new Error("PATCH request error");
          return res.json();
        });
      }
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
      .then((savedPost) => {
        renderImages(savedPost);
      })
      .catch((err) => console.error("Error adding post:", err));
  }

  if (userForm) {
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
  }
});

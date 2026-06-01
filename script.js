const imageMenu = document.getElementById("image-menu-container");
const baseUrl = "http://localhost:3000/";

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach(photo => {
        // renderImages(photo);
    })
    //   data.forEach(renderImages);
    });

  function renderImages(photo) {
    console.log(photo, "photo");

    let linkElement = document.createElement("a");
    linkElement.href = "#";

    const imgElement = document.createElement("img");

    imgElement.src = photo.src
    imgElement.alt = photo.title 
    imgElement.className = "image-menu";

    linkElement.appendChild(imgElement);
    imageMenu.appendChild(linkElement);
  }
});

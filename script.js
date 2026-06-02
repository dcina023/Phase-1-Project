

const imageMenu = document.querySelector(".image-menu"); 

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
        console.log("clicked")
        ///logic for click event, when we click on imgElement,
        ///we want the rest of the objects details to be listed
        //and to append the image to another area of the page below the image menu
        
    })

    linkElement.appendChild(imgElement);
    imageMenu.appendChild(linkElement);
  }

  
});


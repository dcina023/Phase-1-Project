# Interactive Dance Image Gallery

An interactive single-page photo gallery focused on dance. Users can browse images, view captions, like posts, and add their own image stories through a submission form.

The app loads its initial gallery data from a `db.json` file using `json-server`. New user-submitted content is added to the gallery and persists across page reloads while the JSON server is running.

## Features

- View a menu of dance images loaded from `db.json`
- Click an image to display a larger featured view
- Read each image caption or story
- Like individual images
- Submit a new image with a caption
- Add new posts with an initial like count of `0`
- Persist gallery data using `json-server`
- Interact with images through cursor-based visual effects
- Browse added images in a horizontal scrolling gallery

## Interactive Experience

The gallery is designed to feel more dynamic than a static image page. Images respond to cursor movement using `mousemove` and `mouseleave` events.

The `mousemove` event creates a parallax or 3D tilt effect, adding depth and motion to the selected image. The `mouseleave` event returns the image to its original resting state.

As more user-generated content is added, the image menu transitions into a horizontal scrolling layout so the gallery can continue growing without disrupting the page structure.

## User Story

As a user, I want to explore an interactive dance image gallery where I can view photos, read captions, like images, and add my own content. I want the page to feel engaging and visual, while also allowing me to contribute my own dance-related stories.

## Tech Stack

- HTML
- CSS
- JavaScript
- json-server
- db.json

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

git clone git@github.com:dcina023/Phase-1-Project.git

### 2. Navigate into the project folder

cd Phase-1-Project

### 3. Install json-server
 
npm install json-server

### 4. Start the JSON server

npx json-server --watch db.json

### 5. Open the app

Open index.html in your browser

### Data
The app uses db.json as its local database. Initial images are loaded from this file and rendered into the image menu. When a user submits new content, the new image data is added to the JSON server so it remains available after the page reloads.

### Project Status
This project was built as a Phase 1 single-page application focused on DOM manipulation, event handling, asynchronous JavaScript, and local data persistence with json-server.

### Stretch Goals:

Delete content - a user can delete posts from the gallery, removing both the image from the page and the saved data from db. json.

Edit captions - a user can edit image captions after a post has been created

Filter or Search Images - a user can search or filter images to find specific dance styles, captions, or stories.



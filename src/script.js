const photoCount = 30;

const API_KEY = "qv2a0lc81SjJ0PV9gSaLtGmcBj7w8jhts2kf_eCYh5Y";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&t=food-drink&count=${photoCount}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.classList.remove("loader--active");
  }
}

function setAttributes(element, arrtibutes) {
  for (const key in arrtibutes) {
    element.setAttribute(key, arrtibutes[key]);
  }
}

function displayPhotos() {
  loader.classList.add("loader--active");
  totalImages = photoArray.length;
  imagesLoaded = 0;
  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    if (photo.alt_description === null) {
      photo.alt_description = "Красивая фотография из Unsplash";
    }
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    item.append(img);
    imageContainer.append(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("Произошла ошибка: " + error);
    getPhotos();
  }
}
getPhotos();

window.addEventListener("scroll", () => {
  if (
    document.documentElement.clientHeight + window.scrollY >=
      document.body.scrollHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

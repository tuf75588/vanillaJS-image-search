const apiKey = "EO7WjAnOqNIIS0rbTprYGtzRApI94RbmNXr9xpjA";
const API_URL = `https://api.500px.com/v1/photos/search?type=photos&image_size%5B%5D=14&consumer_key=${apiKey}&include_states=true&formats=jpeg&exclude_nude=true;`;
const input = document.querySelector("input");
const form = document.querySelector("form");
const loadingImage = document.querySelector("#loadingImage");
const section = document.querySelector('.images')

loadingImage.style.display = "none";
form.addEventListener("submit", formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  searchStart()
  search(searchTerm).then(displayImages)
  .then(() => {
    loadingImage.style.display = 'none'
  })
}

function search(searchTerm) {
  loadingImage.style.display = "";
  return fetch(`${API_URL}&term=${searchTerm}`)
    .then(data => {
      return data.json();
    })
    .then(result => {
      return result.photos
    });
}
function searchStart() {
  ;loadingImage.style.display = '';
   section.innerHTML = ''
}
function displayImages(images) {
  images.forEach(image => {
    const imgUrl = image.image_url[0];
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', imgUrl);
    section.appendChild(imgElement)
  })
  loadingImage.style.display = 'none';
  input.value = ''

}

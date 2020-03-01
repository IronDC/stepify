const refresh = document.getElementById("refresh-fin");

function change() {
  const item = event.target.name;
  axios
    .post(`/start/refresh`, { item })
    .then(response => updateChange(response))
    .catch(error => console.log(`Error ${error}`));
}

function updateChange(obj) {
  const image = obj.data.image;
  const name = obj.data.name;
  const updateImage = document.getElementById("finalArtist-image");
  const updateName = document.getElementById("finalArtist-name");
  updateImage.innerText = image;
  updateName.innerText = name;
}

refresh.addEventListener("click", function() {
  change();
});

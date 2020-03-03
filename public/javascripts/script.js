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
  const idSpotify = obj.data.idSpotify;
  const name = obj.data.name;
  const updateImage = document.getElementById("finalArtist-image");
  const updateName = document.getElementById("finalArtist-name");
  const form = document.getElementById("form");
  const updateForm = form.getAttribute("action");
  // const updateIdSpotify = document.getElementById("finalArtist-idSpotify");
  // updateImage.getElementById("finalArtist-image") = image;
  updateImage.setAttribute("src", `${image}`);
  updateName.innerText = name;
  //updateIdSpotify.innerText = idSpotify;
  //updateIdSpotify.setAttribute("finalArtist-idSpotify", `${idSpotify}`);
}

refresh.addEventListener("click", function() {
  change();
});

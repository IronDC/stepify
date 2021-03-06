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
  const idSpotify = obj.data.idSpotify;
  const updateImage = document.getElementById("finalArtist-image");
  const updateName = document.getElementById("finalArtist-name");
  const form = document.getElementById("form");
  let updateForm = form.getAttribute("action");
  let url = updateForm.split("&")[0];
  let updateUrl = url + "&" + idSpotify;
  updateImage.setAttribute("src", `${image}`);
  updateName.innerText = name;
  form.setAttribute("action", updateUrl);
}

refresh.addEventListener("click", function() {
  change();
});

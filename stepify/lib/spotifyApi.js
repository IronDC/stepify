require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');

// AQUÍ FALTA UN LET PARA GUARDAR EL ID DEL ARTISTA CON EL QUE QUERAMOS TRABAJAR
// NO ESTOY SEGURO DE QUE LOS EXPORTS ESTÉN BIEN
// HAY QUE DESARROLLAR EL CÓMO LLAMAR A ESTAS FUNCIONES DESDE EL DOM

const spotiClientId = process.env.SPOTICLIENTID;
const spotiSecret = process.env.SPOTICLIENTSECRET;

//spotifyApi.setAccessToken('<your_access_token>');

const spotifyApi = new SpotifyWebApi({
  clientId: spotiClientId,
  clientSecret: spotiSecret,
  redirectUri: '/' // Esta es la URL de callback a la que responderá
});

// Devuelve artistas relacionados

spotifyApi.getArtistRelatedArtists('0qeei9KQnptjwb8MgkqEoy')
  .then(function (data) {
    console.log(data.body);
  }, function (err) {
    done(err);
  });

// Devuelve datos de un artista

spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then(function (data) {
    console.log('Artist information', data.body);
  }, function (err) {
    console.error(err);
  });

module.exports = spotifyApi;
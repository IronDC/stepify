require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");

const spotiClientId = process.env.SPOTICLIENTID;
const spotiSecret = process.env.SPOTICLIENTSECRET;

let credentials = {
  clientId: spotiClientId,
  clientSecret: spotiSecret
};

const spotifyApi = new SpotifyWebApi(credentials);

// // Devuelve artistas relacionados

const spotiGetArtistRelatedArtists = spotiID => {
  return spotifyApi.getArtistRelatedArtists(spotiID);
};

// Devuelve datos de un artista

const spotiGetArtist = artistID => {
  return spotifyApi.getArtist(artistID);
};

// const spotiGetArtist = () => {
//   spotifyApi.getArtist("2hazSY4Ef3aB9ATXW7F5w3").then(
//     function(data) {
//       console.log("Artist information", data.body);
//     },
//     function(err) {
//       console.error(err);
//     }
//   );
// };

module.exports = {
  spotifyApi,
  spotiGetArtistRelatedArtists,
  spotiGetArtist
};

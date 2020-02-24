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
  spotifyApi.getArtistRelatedArtists(spotiID).then(
    function(data) {
      console.log("Pidiendo datos a Spotify desde spotifyApi");
      console.log(data.body);
      const relatedArtist = data.body;
      return relatedArtist;
    },
    function(err) {
      console.error(err);
    }
  );
};

// Devuelve datos de un artista

const spotiGetArtist = () => {
  spotifyApi.getArtist("2hazSY4Ef3aB9ATXW7F5w3").then(
    function(data) {
      console.log("Artist information", data.body);
    },
    function(err) {
      console.error(err);
    }
  );
};

module.exports = {
  spotifyApi,
  spotiGetArtistRelatedArtists,
  spotiGetArtist
};

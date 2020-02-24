const express = require("express");
const router = express.Router();
const passportRouter = require("./passportRouter");
const {
  spotifyApi,
  spotiGetArtistRelatedArtists,
  spotiGetArtist
} = require("./../lib/spotifyApi");
const gameRouter = require("./gameRouter");

/* GET home page */
router.get(
  "/",
  (req, res, next) => {
    // Refrescamos el access token de Spotify en cuanto un usuario llega a la Home
    spotifyApi.clientCredentialsGrant().then(function(data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      //================== Código que ha puesto Diego y que no es necesario aquí. Recordad esto, Carballo y David del futuro.
      //  spotifyApi.getArtistRelatedArtists('0uq5PttqEjj3IH1bzwcrXF').then(({ body }) => {
      //  console.log(body);
      //==================

      // Pintamos index DESPUÉS de haber refrescado el access token (cuando se resuelve la promesa)
      res.render("index");
    });
  },
  function(err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

router.use("/", passportRouter);
router.use("/", gameRouter);

module.exports = router;

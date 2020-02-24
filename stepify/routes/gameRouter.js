const Artist = require("../models/artist");
const Gamesession = require("../models/gameSession");
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const spotifyApi = require("../lib/spotifyApi");
//const SpotifyWebApi = require("spotify-web-api-node");

router.get("/start", ensureLogin.ensureLoggedIn(), async (req, res, next) => {
  try {
    const artist = await Artist.find();
    const cloneArtist = [...artist];
    const selectRandom = array =>
      array[Math.floor(Math.random() * array.length)];

    let initialArtist = selectRandom(cloneArtist);

    let index = cloneArtist.indexOf(initialArtist);

    if (index > -1) {
      cloneArtist.splice(index, 1);
    }
    const finalArtist = selectRandom(cloneArtist);

    return res.render("start", { initialArtist, finalArtist, user: req.user });
  } catch (err) {
    res.send(`Error listing artist": ${err}`);
    next();
  }
});

router.post(
  "/rel-page/:initArtist&:finalArtist",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    try {
      const { initArtist, finalArtist } = req.params;

      const initialArtist = await Artist.findOne({ idSpotify: initArtist });
      let initSpoti;
      let initName;
      let initImage;

      for (const initArt in initialArtist) {
        if (initialArtist.idSpotify) {
          initSpoti = initialArtist.idSpotify;
        }
        if (initialArtist.name) {
          initName = initialArtist.name;
        }
        if (initialArtist.image) {
          initImage = initialArtist.image;
        }
      }
      console.log(
        `INICIAL GUARDADO ---> ${initName}, ${initSpoti}, ${initImage}`
      );
      const endArtist = await Artist.findOne({ idSpotify: finalArtist });

      let endSpoti;
      let endName;
      let endImage;

      for (const endArt in endArtist) {
        if (endArtist.idSpotify) {
          endSpoti = endArtist.idSpotify;
        }
        if (initialArtist.name) {
          endName = endArtist.name;
        }
        if (endArtist.image) {
          endImage = endArtist.image;
        }
      }
      console.log(`FINAL GUARDADO ---> ${endName}, ${endSpoti}, ${initImage}`);

      await Gamesession.create([
        {
          initArtist: {
            idSpotify: initSpoti,
            name: initName,
            image: initImage
          },
          endArtist: { idSpotify: endSpoti, name: endName, image: endImage },
          artistArray: []
        }
      ]);

      console.log(`CREATE OK --- redireccionando...`);
      return res.redirect(`/rel-page/${initArtist}&${finalArtist}`);
    } catch (err) {
      res.send(`Error retrieving Rel Page": ${err}`);
      next();
    }
  }
);

router.get(
  "/rel-page/:initArtist&:finalArtist",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    try {
      const { initArtist, finalArtist } = req.params;
      const initialArtist = await Artist.findOne({ idSpotify: initArtist });
      // pedir los relacionados de spotify de initialArtist
      console.log(initialArtist.idSpotify);
      console.log("Pidiendo datos desde gameRouter GET");
      const relatedArtistFromSpoti = await spotifyApi.spotiGetArtistRelatedArtists(
        initialArtist.idSpotify
      );
      console.log(relatedArtistFromSpoti);

      const finArtist = await Artist.findOne({ idSpotify: finalArtist });
      return res.render("rel-page", {
        initialArtist,
        finArtist,
        // enviar los relacionados de spotify al DOM
        user: req.user
      });
    } catch (err) {
      res.send(`Error retrieving Rel Page": ${err}`);
      next();
    }
  }
);

module.exports = router;

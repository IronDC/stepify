const Artist = require("../models/artist");
const Gamesession = require("../models/gameSession");
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const spotifyApi = require("../lib/spotifyApi");
//const SpotifyWebApi = require("spotify-web-api-node");

// Inicio del juego
router.get("/start", ensureLogin.ensureLoggedIn(), async (req, res, next) => {
  //const { id } = req.body;

  try {
    const artist = await Artist.find();
    const cloneArtist = [...artist];
    //const sessionId = await Gamesession.findById(id);
    const selectRandom = array =>
      array[Math.floor(Math.random() * array.length)];

    let initialArtist = selectRandom(cloneArtist);

    let index = cloneArtist.indexOf(initialArtist);

    if (index > -1) {
      cloneArtist.splice(index, 1);
    }
    const finalArtist = selectRandom(cloneArtist);

    return res.render("start", {
      initialArtist,
      finalArtist,
      user: req.user
    });
  } catch (err) {
    res.send(`Error listing artist": ${err}`);
    next();
  }
});

// Post de la primera página con relacionados
router.post(
  "/rel-page/:initArtist&:finalArtist",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    try {
      console.log("POST DE LA PRIMERA PAGINA DE RELACIONADOS");
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
        if (endArtist.name) {
          endName = endArtist.name;
        }
        if (endArtist.image) {
          endImage = endArtist.image;
        }
      }
      console.log(`FINAL GUARDADO ---> ${endName}, ${endSpoti}, ${endImage}`);

      const newGame = await Gamesession.create([
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

      console.log(`CREATE OK CON ID ${newGame[0]._id} --- redireccionando... `);
      return res.redirect(
        `/rel-page/${initArtist}&${finalArtist}&${newGame[0]._id}`
      );
    } catch (err) {
      res.send(`Error retrieving Rel Page": ${err}`);
      next();
    }
  }
);

// GET para cargar la primera página de relacionados
router.get(
  "/rel-page/:initArtist&:finalArtist&:sessionId",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    try {
      const { initArtist, finalArtist, sessionId } = req.params;
      console.log(`Cargando REL PAGE con ID: ${sessionId}`);
      const initialArtist = await Artist.findOne({ idSpotify: initArtist });
      // pedimos los relacionados de Spotify del initialArtist
      const relatedArtistFromSpoti = await spotifyApi.spotiGetArtistRelatedArtists(
        initialArtist.idSpotify
      );

      const finArtist = await Artist.findOne({ idSpotify: finalArtist });
      return res.render("rel-page", {
        initialArtist,
        finArtist,
        relatedArtistFromSpoti: relatedArtistFromSpoti.body.artists,
        sessionId,
        user: req.user
      });
    } catch (err) {
      res.send(`Error retrieving Rel Page": ${err}`);
      next();
    }
  }
);

// CARGAMOS LA PÁGINA DE PASO A PASO CON NUEVOS RELACIONADOS

router.get(
  "/steps/:relArtist&:sessionId",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    try {
      const { relArtist, sessionId } = req.params;
      const session = await Gamesession.findById(sessionId);

      console.log(`Sesion sale? ${session}`);
      const { initArtist, endArtist, artistArray } = session; // HAY QUE PASARLE EL ARTISTARRAY AL HBS
      const lastArtistArray = artistArray[artistArray.length - 1];
      
      if (endArtist.idSpotify === lastArtistArray.idSpotify) {
        console.log(
          `has terminado machote ${endArtist.idSpotify}, ${lastArtistArray.idSpotify}`);
          return res.render("end", {
            // HAY QUE PASARLE EL ARTISTARRAY AL HBS
            initArtist,
            endArtist,
            artistArray,
            user: req.user
          });
      } else {
        const relatedArtistFromSpoti = await spotifyApi.spotiGetArtistRelatedArtists(
          relArtist
        );

        return res.render("steps", {
          // HAY QUE PASARLE EL ARTISTARRAY AL HBS
          initArtist,
          endArtist,
          sessionId,
          artistArray,
          relatedArtistFromSpoti: relatedArtistFromSpoti.body.artists,
          user: req.user
        });
      }

    } catch (err) {
      res.send(`Error retrieving Rel Page from GET": ${err}`);
      next();
    }
  }
);

// PÁGINA CON RELACIONADOS DE PASO A PASO

router.post(
  "/steps/:relArtist&:sessionId",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    try {
      const { relArtist, sessionId } = req.params;
      const session = await Gamesession.findById(sessionId);

      const savedArtist = await spotifyApi.spotiGetArtist(relArtist);

      session.artistArray.push({
        name: savedArtist.body.name,
        idSpotify: savedArtist.body.id
      });
      await session.save();
      console.log("Actualizado el array con relArtists");

      return res.redirect(`/steps/${relArtist}&${sessionId}`);
    } catch (err) {
      res.send(`Error retrieving Rel Page from POST": ${err}`);
      next();
    }
  }
);

module.exports = router;

const Artist = require("../models/artist");
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

router.get("/start", ensureLogin.ensureLoggedIn(), async (req, res, next) => {
  try {
    const artist = await Artist.find();
    const selectRandom = array =>
      array[Math.floor(Math.random() * array.length)];

    Array.prototype.removeItem = function(a) {
      for (let i = 0; i > array.length; i++) {
        if (this[i] == a) {
          this.splice(i, 1);
          return;
        }
      }
    };
    const cloneArtist = [...artist];
    const initialArtist = selectRandom(cloneArtist);
    console.log(initialArtist);
    console.log(`the colecction artist ${artist}`);
    console.log(`the clone colecction artist ${cloneArtist}`);
    return res.render("start", { artist, user: req.user });
  } catch (err) {
    res.send(`Error listing artist": ${err}`);
    next();
  }
});

module.exports = router;

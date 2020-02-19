const Artist = require("../models/artist");
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

router.get("/start", ensureLogin.ensureLoggedIn(), async (req,res,next) => {
  try{
    const artist = await Artist.find();
    return res.render("start", {artist, user: req.user});
  }catch(err){
    res.send(`Error listing artist": ${err}`)
    next();
  }

});

module.exports = router;
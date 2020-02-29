const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    initArtist: { idSpotify: String, name: String, image: String },
    endArtist: { idSpotify: String, name: String, image: String },
    artistArray: [{ name: String, idSpotify: String, _id: false }]
  },
  {
    timestamps: true
  }
);

const gameSession = mongoose.model("gameSession", sessionSchema);
module.exports = gameSession;

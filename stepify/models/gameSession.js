const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    initArtist: { idSpotify: String, name: String, image: String },
    endArtist: { idSpotify: String, name: String, image: String },
    artistArray: [{ type: Schema.Types.ObjectId, ref: "artist" }]
  },
  {
    timestamps: true
  }
);

const Session = mongoose.model("session", sessionSchema);
module.exports = Session;

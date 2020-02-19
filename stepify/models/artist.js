const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    idSpotify: String,
    name: String,
    image: String,
    userType: {
      type: String,
      enum: ['initial', 'session'],
      default: 'initial'
    },
    
  },
  {
    timestamps: true
  }
);

const Artist = mongoose.model("artist", artistSchema);
module.exports = Artist;

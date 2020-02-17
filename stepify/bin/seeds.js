const { withDbConnection, dropIfExists } = require("../withDbConnection");
const User = require("../models/user");
const Gamesession = require("../models/gamesession");
const Artist = require("../models/artist");

withDbConnection(async () => {
  await dropIfExists(Artist);
  await Artist.deleteMany();
  await Artist.create([
    {
      idSpotify: "0uq5PttqEjj3IH1bzwcrXF",
      name: "Spice Girls",
      image: "https://i.scdn.co/image/c6f6b80a3f338b7577a6daa6e27cb0c3f621bb02",
      enum: "initial"
    },
    {
      idSpotify: "1yxSLGMDHlW21z4YXirZDS",
      name: "The Black Eyed Peas",
      image: "https://i.scdn.co/image/ad2b20d12b16fcb7661dda1455be8b4f1bf0a6e8",
      enum: "initial"
    },
    {
      idSpotify: "4vRSocKbGh7PsQrYRDVMEF",
      name: "Lindsay Lohan",
      image: "https://i.scdn.co/image/03f1063b33685a52971b20f9119f2730441af4f0",
      enum: "initial"
    },
    {
      idSpotify: "6XCS9JCn56Q252cMOTbeq6",
      name: "Danii Minoge",
      image: "https://i.scdn.co/image/07e7c2c6b5b1180cffbb57b4ca4acc7679c927bf",
      enum: "initial"
    }
  ]);
});

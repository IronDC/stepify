const SpotifyWebApi = require('spotify-web-api-node');

const spotiClientId = process.env.SPOTICLIENTID;
const spotiSecret = process.env.SPOTICLIENTSECRET;

//spotifyApi.setAccessToken('<your_access_token>');

const spotifyApi = new SpotifyWebApi({
  clientId: spotiClientId,
  clientSecret: spotiSecret,
  redirectUri: '/'
});

spotifyApi.getArtistRelatedArtists('0qeei9KQnptjwb8MgkqEoy')
  .then(function (data) {
    console.log(data.body);
  }, function (err) {
    done(err);
  });
const express = require("express");
const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.CLEANIFY_FRONTEND_URL,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  console.log("API Route: /login");
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {
  console.log("API Route: /refresh");
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.CLEANIFY_FRONTEND_URL,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log("Error when refreshing access token", err);
      res.sendStatus(400);
    });
});

app.post("/logout", (req, res) => {
  console.log("API Route: /logout");
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.CLEANIFY_FRONTEND_URL,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });
  spotifyApi.resetCredentials();
  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (_, res) => {
  console.log("API Route: catch-all (*)");
  res.sendFile(path.join(__dirname, "client/build", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const API_PORT = process.env.PORT || 4000;

app.listen(API_PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server live at ${API_PORT}`);
});

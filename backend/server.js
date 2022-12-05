const express = require("express");
const games = require("./data/games");
const app = express();

app.get("/api/games", (req, res) => {
  res.json(games);
});

app.get("/api/games/:id", (req, res) => {
  const game = games.find(g => g._id == req.params.id);
  res.json(game);
});

app.listen(5000, console.log("Server running on port 5000."));

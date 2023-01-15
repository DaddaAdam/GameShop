import Game from "../models/gameModel.js";
import expressAsyncHandler from "express-async-handler";

// @desc    Récuperer tous les jeux
// @route   GET /api/games
// @access  Public
const getGames = expressAsyncHandler(async (req, res) => {
  const games = await Game.find({});

  res.json(games);
});

// @desc    Récupérer un jeu par son Id
// @route   GET /api/games
// @access  Public
const getGameById = expressAsyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);
  try {
    if (game) {
      res.json(game);
    } else
      res.status(404).json({
        message: "Game does not exist.",
      });
  } catch (err) {
    console.log(err.message);
  }
});

export { getGames, getGameById };

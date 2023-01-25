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

// @desc    Supprimer un jeu
// @route   DELETE /api/users
// @access  Private/Admin
const deleteGame = expressAsyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (game) {
    await game.remove();
    res.json({
      message: "Le jeu a été supprimé avec succès.",
    });
  } else {
    res.status(404);
    throw new Error("Le jeu spécifié n'existe pas.");
  }
});

export { getGames, getGameById, deleteGame };

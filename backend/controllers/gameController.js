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
// @route   DELETE /api/games/:id
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

// @desc    Ajouter un jeu
// @route   POST /api/games
// @access  Private/Admin
const createGame = expressAsyncHandler(async (req, res) => {
  const game = new Game({
    name: "Nom du jeu",
    image: "/images/RDR2.jpg",
    description: "Description du jeu",
    release_date: Date.now(),
    developper: "Éditeur du jeu",
    reviews: [],
  });

  const createdGame = await game.save();
  res.status(201).json(createdGame);
});

// @desc    Modifier un jeu
// @route   PUT /api/games/:id
// @access  Private/Admin
const updateGame = expressAsyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    platforms,
    release_date,
    price,
    developper,
    reviews,
    rating,
    numReviews,
  } = req.body;

  const game = await Game.findById(req.params.id);
  if (game) {
    game.name = name;
    game.image = image;
    game.description = description;
    game.platforms = platforms;
    game.release_date = release_date;
    game.price = price;
    game.developper = developper;
    game.reviews = reviews;
    game.rating = rating;
    game.numReviews = numReviews;

    const updatedGame = await game.save();
    res.json(updatedGame);
  } else {
    res.status(404);
    throw new Error("Le jeu spécifié n'existe pas.");
  }
});

// @desc    Créer un nouveau commentaire
// @route   POST /api/games/:id/reviews
// @access  Private
const createNewReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const game = await Game.findById(req.params.id);
  if (game) {
    const alreadyReviewed = game.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Vous avez déjà évalué ce jeu.");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    game.reviews.push(review);
    game.numReviews = game.reviews.length;
    game.rating =
      game.reviews.reduce((acc, item) => item.rating + acc, 0) /
      game.reviews.length;

    const updatedGame = await game.save();
    res.status(201).json({
      message: "Evaluation ajoutée.",
    });
  } else {
    res.status(404);
    throw new Error("Le jeu spécifié n'existe pas.");
  }
});

export {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  createNewReview,
};

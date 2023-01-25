import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc    Authentifier un utilisateur & renvoyer un token
// @route   POST /api/users/login
// @access  Public
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email ou mot de passe invalide.");
  }
});

// @desc    Incrire un nouvel utilisateur
// @route   POST /api/users
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("L'utilisateur existe déjà.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Données utilisateur invalides.");
  }
});

// @desc    Retourner les information d'un utilisateur authentifié
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("ERREUR: l'utilisateur n'existe pas.");
  }
});

// @desc    Modifier le profil d'un utilisateur
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("ERREUR: données invalides.");
  }
});

// @desc    Retourne tous les utilisateurs
// @route   GET /api/users
// @access  Private/Admin
const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @desc    Supprimer un utilisateur
// @route   DELETE /api/users
// @access  Private/Admin
const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({
      message: "L'utilisateur a été supprimé avec succès.",
    });
  } else {
    res.status(404);
    throw new Error("L'utilisateur spécifié n'existe pas.");
  }

  res.json(users);
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
};

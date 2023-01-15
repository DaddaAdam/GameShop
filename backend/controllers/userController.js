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

export { authUser, getUserProfile };
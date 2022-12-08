import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  platforms: {
    steam: {
      type: Boolean,
      required: true,
      default: false,
    },
    playstation_4: {
      type: Boolean,
      required: true,
      default: false,
    },
    playstation_5: {
      type: Boolean,
      required: true,
      default: false,
    },
    xbox_one: {
      type: Boolean,
      required: true,
      default: false,
    },
    xbox_series: {
      type: Boolean,
      required: true,
      default: false,
    },
    nintendo_switch: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  release_date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  developper: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0.0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;

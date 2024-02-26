import mongoose from "mongoose";
import Image from "./Image.js";
import URL from "../helper/urlStringValidation.helper.js";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 256,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    minLength: 2,
    maxLength: 1024,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    min: 1900,
    max: 2024,
    required: true,
  },
  category: [String],
  director: {
    type: String,
    minLength: 2,
    maxLength: 256,
    required: true,
    trim: true,
  },
  actors: [String],
  trailer: URL,
  watchLink: URL,
  image: [Image],
  likes: [],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
const Movie = mongoose.model("movie", movieSchema);
export default Movie;

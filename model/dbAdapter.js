import connectToMongo from "./mongodb/dbConnect.js";
import { createUser as createUserMongo } from "./mongodb/users/userService.js";
import { createMovie as createMovieMongo } from "./mongodb/movies/movieService.js";
import { getAllUsers as getAllUsersMongo } from "./mongodb/users/userService.js";
import { getUserById as getUserByIdMongo } from "./mongodb/users/userService.js";
import { getUserByEmail as getUserByEmailMongo } from "./mongodb/users/userService.js";
import { updateUser as updateUserMongo } from "./mongodb/users/userService.js";
import { deleteUser as deleteUserMongo } from "./mongodb/users/userService.js";
import { getAllMovies as getAllMoviesMongo } from "./mongodb/movies/movieService.js";
import { getMovieById as getMovieByIdMongo } from "./mongodb/movies/movieService.js";
import { updateMovie as updateMovieMongo } from "./mongodb/movies/movieService.js";
import { deleteMovie as deleteMovieMongo } from "./mongodb/movies/movieService.js";
import { patchIsBiz as patchIsBizMongo } from "./mongodb/users/userService.js";
import { getAllMyMovies as getAllMyMoviesMongo } from "./mongodb/movies/movieService.js";
import { updateLikeMovie as updateLikeMovieMongo } from "./mongodb/movies/movieService.js";
import normalizeUser from "../normalize/user.normalize.js";
import normalizeMovie from "../normalize/movies.normalize.js";
import checkIdSchemaValidation from "../validation/joi/checkId.js";
const DB = "mongo";

const connectToDb = () => {
  if (DB === "mongo") {
    return connectToMongo();
  }
};

const createUser = (user) => {
  user = normalizeUser(user);
  if (DB === "mongo") {
    return createUserMongo(user);
  }
};

const getAllUsers = () => {
  if (DB === "mongo") {
    return getAllUsersMongo();
  }
};

const getUserById = (id) => {
  if (DB === "mongo") {
    return getUserByIdMongo(id);
  }
};

const getUserByEmail = (email) => {
  if (DB === "mongo") {
    return getUserByEmailMongo(email);
  }
};

const updateUser = (id, user) => {
  user = normalizeUser(user);
  if (DB === "mongo") {
    return updateUserMongo(id, user);
  }
};

const deleteUser = (id) => {
  if (DB === "mongo") {
    return deleteUserMongo(id);
  }
};
const patchIsBiz = (id, isBusiness) => {
  if (DB === "mongo") {
    return patchIsBizMongo(id, isBusiness);
  }
};

const createMovie = async (movie) => {
  movie = await normalizeMovie(movie);
  if (DB === "mongo") {
    return createMovieMongo(movie);
  }
};

const getAllMovies = () => {
  if (DB === "mongo") {
    return getAllMoviesMongo();
  }
};

const getAllMyMovies = (user_id) => {
  if (DB === "mongo") {
    return getAllMyMoviesMongo(user_id);
  }
};

const getMovieById = (id) => {
  if (DB === "mongo") {
    return getMovieByIdMongo(id);
  }
};

const updateMovie = async (id, movie) => {
  movie = await normalizeMovie(movie);
  if (DB === "mongo") {
    return updateMovieMongo(id, movie);
  }
};

const updateLikeMovie = (id, likes) => {
  if (DB === "mongo") {
    return updateLikeMovieMongo(id, likes);
  }
};

const deleteMovie = (id) => {
  if (DB === "mongo") {
    return deleteMovieMongo(id);
  }
};

export default connectToDb;
export {
  createUser,
  createMovie,
  updateUser,
  deleteUser,
  getAllUsers,
  patchIsBiz,
  getUserById,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  getUserByEmail,
  getAllMyMovies,
  updateLikeMovie,
};

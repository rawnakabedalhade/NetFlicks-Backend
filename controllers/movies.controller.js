import {
  getAllMovies,
  getMovieById,
  getAllMyMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  updateLikeMovie,
} from "../model/dbAdapter.js";
import handleError from "../utils/handleError.js";

const getAllMoviesController = async (req, res) => {
  try {
    console.log(1);
    let movies = await getAllMovies();
    console.log(movies, "movies");
    res.json(movies);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const getAllMyMoviesController = async (req, res) => {
  try {
    console.log(req.userData._id);
    let mymovies = await getAllMyMovies(req.userData._id);
    console.log(mymovies, "mymovies");
    return res.json(mymovies);
  } catch (err) {
    console.log("fromMymovies");
    handleError(res, 400, err.message);
  }
};

const getMovieByIdController = async (req, res) => {
  try {
    let movie = await getMovieById(req.params.id);
    res.json(movie);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const createMovieController = async (req, res) => {
  try {
    let userId = req.userData._id;
    req.body.user_id = userId;
    let newMovie = await createMovie(req.body);
    return res.json(newMovie);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const updateMovieController = async (req, res) => {
  try {
    const movieFromDb = await getMovieById(req.params.id);
    let { user_id } = movieFromDb;
    user_id = user_id + "";
    if (!movieFromDb) {
      throw new Error("Cant find movie");
    }
    if (req.userData.idBusiness && req.userData.id !== user_id) {
      throw new Error(
        "You are not allowed to update this movie ,you must be the owner of this movie"
      );
    }
    let updatedmovie = await updateMovie(req.params.id, req.body);
    return res.json(updatedmovie);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const deleteMovieController = async (req, res) => {
  try {
    const movieFromDb = await getMovieById(req.params.id);
    if (!movieFromDb) {
      throw new Error("movie not found");
    }
    let { user_id } = movieFromDb;
    user_id = user_id + "";
    if (
      !req.userData.isAdmin &&
      req.userData.isBusiness &&
      req.userData._id !== user_id
    ) {
      throw new Error(
        "You are not allowed to update this movie, you must be the owner of the movie or admin"
      );
    }
    const movieAfterDeleteFromDb = await deleteMovie(req.params.id);
    return res.json(movieAfterDeleteFromDb);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const patchLikeMovieController = async (req, res) => {
  try {
    let movie = await getMovieById(req.params.id);
    if (!movie) {
      throw new Error("Cant find movie");
    }
    let { likes } = movie;
    if (likes.includes(req.userData._id)) {
      likes = movie.likes.filter((id) => id !== req.userData._id);
    } else {
      likes.push(req.userData._id);
    }
    let updatedmovie = await updateLikeMovie(req.params.id, likes);
    return res.json(updatedmovie);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

// const patchBizNumberController = async (req, res) => {
//   try {
//     let card = await getCardById(req.params.id);
//     if (!card) {
//       throw new Error("Cant find card");
//     }
//     let existingCardWithBizNumber = await checkUniqBizNumber(
//       req.body.bizNumber
//     );
//     if (
//       existingCardWithBizNumber &&
//       existingCardWithBizNumber._id !== req.params.id
//     ) {
//       throw new Error("bizNumber must be unique");
//     }
//     card.bizNumber = req.body.bizNumber;
//     let updatedCard = await updateCard(req.params.id, card);
//     return res.json(updatedCard);
//   } catch (err) {
//     handleError(res, 400, err.message);
//   }
// };
export {
  getAllMoviesController,
  getMovieByIdController,
  getAllMyMoviesController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  patchLikeMovieController,
};

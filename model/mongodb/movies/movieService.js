import Movie from "./Movie.js";

//create
const createMovie = (movieData) => {
  let movie = new Movie(movieData);
  return movie.save();
};

//read
const getAllMovies = async () => {
  return await Movie.find();
};

const getAllMyMovies = (user_id) => {
  return Movie.find({ user_id: user_id });
};

//read
const getMovieById = (id) => {
  return Movie.findById(id);
};

//update
const updateMovie = (id, movieData) => {
  return Movie.findByIdAndUpdate(id, movieData, { new: true });
};

//delete
const deleteMovie = (id) => {
  return Movie.findByIdAndDelete(id);
};

const updateLikeMovie = (id, likes) => {
  return Movie.findByIdAndUpdate(id, { likes }, { new: true });
};
export {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getAllMyMovies,
  updateLikeMovie,
};

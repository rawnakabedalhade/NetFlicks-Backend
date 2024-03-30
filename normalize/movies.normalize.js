import debug from "debug";

const normalizeMovie = async (movie) => {
  const logger = debug("app:normalizeMovie");
  try {
    let image = {};
    image = {
      ...movie.image,
      url:
        movie.image.url ||
        "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg",
      alt: movie.image.alt || "default movie image",
    };
    if (movie.image.alt && !movie.image.url) {
      image = {
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg",
        alt: "default movie image",
      };
    }
    return {
      ...movie,
      image,
      trailer: movie.trailer || undefined,
    };
  } catch (err) {
    logger(err);
  }
};

export default normalizeMovie;

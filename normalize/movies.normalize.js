import debug from "debug";

const normalizeMovie = async (movie) => {
  const logger = debug("app:normalizeMovie");
  try {
    const normalizedImages = movie.image.map((img) => {
      let normalizedImage = {
        url:
          img.url ||
          "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg",
        alt: img.alt || "default movie image",
      };
      if (!img.alt) {
        normalizedImage.alt = "default movie image";
      }
      return normalizedImage;
    });
    return {
      ...movie,
      image: normalizedImages,
      trailer: movie.trailer || undefined,
    };
  } catch (err) {
    logger(err);
  }
};

export default normalizeMovie;

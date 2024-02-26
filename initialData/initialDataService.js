import { createMovie, createUser } from "../model/dbAdapter.js";

import debug from "debug";

const initialUsers = async () => {
  let users = [
    {
      name: {
        first: "rawnak",
        last: "shihab",
      },
      phone: "05024711464",
      email: "rawnak@gmail.com",
      password: "$2a$10$rOKmdzSaUFv2OF5giTT/HO.g3t4MujQJl98cAyKbfP11JKInv43PS",
      image: {
        url: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        alt: "profile picture",
      },
      address: {
        country: "Israel",
        city: "Iksal",
        street: "Main Street",
        houseNumber: 1234,
        zip: 94107,
      },
      isBusiness: true,
      isAdmin: true,
    },
    {
      name: {
        first: "rawnak2",
        last: "shihab2",
      },
      phone: "05024711462",
      email: "rabed2@gmail.com",
      password: "$2a$10$A./.k3mJpPiBaqxlrBwZG..QaftAJDpnwDiqNcLZtOZwiAErRP57.",
      image: {
        url: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        alt: "profile picture",
      },
      address: {
        country: "Israel",
        city: "Iksal",
        street: "Main Street",
        houseNumber: 1234,
        zip: 94107,
      },
      isBusiness: true,
      isAdmin: false,
    },
  ];
  try {
    let bizId = "";
    for (let user of users) {
      let userFromDb = await createUser(user);
      if (!user.isAdmin && user.isBusiness) {
        bizId = userFromDb._id;
      }
    }
    return bizId;
  } catch (err) {
    let logger = debug("app:initialData");
    logger("error from initialUser", err);
  }
};

const initialMovies = async (bizId) => {
  let movies = [
    {
      title: "Inception",
      description:
        "A thief who enters the dreams of others to steal secrets from their subconscious.",
      year: 2010,
      category: ["Action", "Sci-Fi", "Thriller"],
      director: "Christopher Nolan",
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      watchLink: "https://www.example.com/inception",
      image: [
        {
          url: "https://example.com/inception_poster.jpg",
          alt: "Inception Poster",
        },
        {
          url: "https://example.com/inception_still1.jpg",
          alt: "Inception Still 1",
        },
        {
          url: "https://example.com/inception_still2.jpg",
          alt: "Inception Still 2",
        },
      ],
      user_id: bizId,
    },
    {
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      year: 2008,
      category: ["Action", "Crime", "Drama"],
      director: "Christopher Nolan",
      actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      watchLink: "https://www.example.com/dark-knight",
      image: [
        {
          url: "https://example.com/dark_knight_poster.jpg",
          alt: "The Dark Knight Poster",
        },
        {
          url: "https://example.com/dark_knight_still1.jpg",
          alt: "The Dark Knight Still 1",
        },
        {
          url: "https://example.com/dark_knight_still2.jpg",
          alt: "The Dark Knight Still 2",
        },
      ],
      user_id: bizId,
    },
    {
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      year: 2014,
      category: ["Adventure", "Drama", "Sci-Fi"],
      director: "Christopher Nolan",
      actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      watchLink: "https://www.example.com/interstellar",
      image: [
        {
          url: "https://example.com/interstellar_poster.jpg",
          alt: "Interstellar Poster",
        },
        {
          url: "https://example.com/interstellar_still1.jpg",
          alt: "Interstellar Still 1",
        },
        {
          url: "https://example.com/interstellar_still2.jpg",
          alt: "Interstellar Still 2",
        },
      ],
      user_id: bizId,
    },
  ];
  try {
    for (let movie of movies) {
      await createMovie(movie);
    }
  } catch (err) {
    let logger = debug("app:initialData");
    logger("error from initialMovies", err);
  }
};
export { initialUsers, initialMovies };

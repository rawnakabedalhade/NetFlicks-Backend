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
      title: "Fast and Furious ",
      description:
        "Dominic Toretto is forced to put his retirement on hold when Cipher, the dangerous cyberterrorist, escapes with the help of Dominic's estranged brother, an international terrorist",
      year: 2021,
      category: ["Action"],
      director: "Justin Lin",
      actors: ["Vin Diesel", "Paul Walker", "Brandon T"],
      trailer:
        "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/b1e2759a-9099-40e9-a6eb-387f85ee24e8.mp4?alt=media",
      watchLink:
        "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/b1e2759a-9099-40e9-a6eb-387f85ee24e8.mp4?alt=media",
      image: {
        url: "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/c2ffb566-4940-4418-bf85-2fae2480b708.jpeg?alt=media",
        alt: "Fast and Furious ",
      },
      user_id: bizId,
    },
    {
      title: "The School For Good And Evil",
      description:
        "est friends Sophie and Agatha find themselves on opposing sides of an epic battle when they're swept away into an enchanted school where aspiring heroes and villains are trained to protect the balance between good and evil.",
      year: 2022,
      category: ["Drama", "Fantasy"],
      director: "Paul Feig",
      actors: [
        "Sophia Anne Caruso",
        "Sofia Wylie",
        "Laurel Jones",
        "Charlize Theron",
      ],
      trailer:
        "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/4e1c6adb-8f19-49b4-b590-79b5402d1234.mp4?alt=media",
      watchLink:
        "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/4e1c6adb-8f19-49b4-b590-79b5402d1234.mp4?alt=media",
      image: {
        url: "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/99abbb7b-38b4-4116-895e-34d3a2fc1d00.jpeg?alt=media",
        alt: "The School For Good And Evil",
      },

      user_id: bizId,
    },
    {
      title: "Captain America",
      description:
        "As Steve Rogers adapts to the complexities of a contemporary world, he joins Natasha Romanoff and Sam Wilson in his mission to uncover the secret behind a deadly, mysterious assassin.",
      year: 2014,
      category: ["Action", "Adventure"],
      director: "Anthony Russo",
      actors: [
        "Chris Evans",
        "Sebastian Stan",
        "Scarlett Johansson",
        "Samuel L. Jackson",
      ],
      trailer:
        "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/605dafa2-89fe-45f5-bf4b-b12e41e020d4.mp4?alt=media",
      watchLink:
        "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/605dafa2-89fe-45f5-bf4b-b12e41e020d4.mp4?alt=media",
      image: {
        url: "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/0525df0f-1726-4d06-8850-bdbfb4911ac1.jpeg?alt=media",
        alt: "Captain America",
      },

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

import moviesSchemaValidation from "./joi/movies/movies.js";
import editUserSchemaValidation from "./joi/users/editUser.js";
import loginSchemaValidation from "./joi/users/login.js";
import registerSchemaValidation from "./joi/users/register.js";
import patchSchemaValidation from "./joi/users/patchUser.js";
import checkIdSchemaValidation from "./joi/checkId.js";

const VALIDATION = "joi";

const loginValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return loginSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const registerValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return registerSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const editUserValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return editUserSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const patchUserValidation = (userInput) => {
  if (VALIDATION === "joi") {
    console.log("fromval", userInput);
    return patchSchemaValidation(userInput);
  } else {
    console.log("fromval", userInput);
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const MovieValidation = (MovieInput) => {
  if (VALIDATION === "joi") {
    return moviesSchemaValidation(MovieInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const createMovieValidation = (MovieInput) => {
  if (VALIDATION === "joi") {
    return moviesSchemaValidation(MovieInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const ObjectIdValidation = (id) => {
  if (VALIDATION === "joi") {
    return checkIdSchemaValidation(id);
  } else {
    throw new Error(`Validation id ${VALIDATION} is not supported`);
  }
};

export {
  registerValidation,
  loginValidation,
  MovieValidation,
  editUserValidation,
  patchUserValidation,
  ObjectIdValidation,
  createMovieValidation,
};

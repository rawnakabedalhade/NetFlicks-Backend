import { DEFAULT_STRING_VALIDATION } from "../helper/defaultStringValidation.helper.js";
import URL from "../helper/urlStringValidation.helper.js";
import mongoose from "mongoose";

const Image = new mongoose.Schema({
  url: URL,
  alt: DEFAULT_STRING_VALIDATION,
});

export default Image;

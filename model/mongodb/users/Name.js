import {
  DEFAULT_REQUIRED_STRING_VALIDATION,
  DEFAULT_STRING_VALIDATION,
} from "../helper/defaultStringValidation.helper.js";
import mongoose from "mongoose";

const Name = new mongoose.Schema({
  first: DEFAULT_REQUIRED_STRING_VALIDATION,
  middle: DEFAULT_STRING_VALIDATION,
  last: DEFAULT_REQUIRED_STRING_VALIDATION,
});

export default Name;

import {
  DEFAULT_NUMBER_VALIDATION,
  DEFAULT_ZIPNUM_VALIDATIO,
} from "../helper/defaultNumberValidation.helper.js";
import {
  DEFAULT_REQUIRED_STRING_VALIDATION,
  DEFAULT_STRING_VALIDATION,
} from "../helper/defaultStringValidation.helper.js";
import mongoose from "mongoose";

const Address = new mongoose.Schema({
  state: DEFAULT_STRING_VALIDATION,
  country: DEFAULT_REQUIRED_STRING_VALIDATION,
  city: DEFAULT_REQUIRED_STRING_VALIDATION,
  street: DEFAULT_REQUIRED_STRING_VALIDATION,
  houseNumber: DEFAULT_NUMBER_VALIDATION,
  zip: DEFAULT_ZIPNUM_VALIDATIO,
});

export default Address;

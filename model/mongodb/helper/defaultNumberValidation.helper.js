const DEFAULT_NUMBER_VALIDATION = {
  type: Number,
  minLength: 2,
  maxlength: 256,
  trim: true,
  required: true,
};

const DEFAULT_ZIPNUM_VALIDATIO = {
  type: Number,
  minLength: 1000,
  maxlength: 9000,
  trim: true,
  required: true,
  default: 0,
};
export { DEFAULT_NUMBER_VALIDATION, DEFAULT_ZIPNUM_VALIDATIO };

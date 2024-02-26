import Joi from "joi";

const moviesSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  year: Joi.number().min(1900).max(2024).required(),
  category: Joi.array().items(Joi.string()).required(),
  director: Joi.string().min(2).max(256).required(),
  actors: Joi.array().items(Joi.string()).required(),
  trailer: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .min(14),
  watchLink: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .min(14),
  image: Joi.array().items(
    Joi.object().keys({
      url: Joi.string().uri({ scheme: ["http", "https"] }),
      alt: Joi.string().min(2).max(256).allow(""),
    })
  ),
});

const moviesSchemaValidation = (movieInput) => {
  return moviesSchema.validateAsync(movieInput);
};

export default moviesSchemaValidation;

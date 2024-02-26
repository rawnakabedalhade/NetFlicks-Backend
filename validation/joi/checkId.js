import Joi from "joi";

const checkIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const checkIdSchemaValidation = (id) => {
  return checkIdSchema.validateAsync({ id });
};

export default checkIdSchemaValidation;

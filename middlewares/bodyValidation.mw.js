import handleError from "../utils/handleError.js";

const bodyValidationMiddleWare = (validateSchema) => async (req, res, next) => {
  const body = req.body;
  try {
    await validateSchema(body);
    console.log(body, "frombodyVal");
    next();
  } catch (err) {
    handleError(res, 400, err.message);
  }
};
export default bodyValidationMiddleWare;

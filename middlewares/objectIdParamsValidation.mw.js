import handleError from "../utils/handleError.js";
import { ObjectIdValidation } from "../validation/validationAdapter.js";

const objectIdParamsValidationMiddleware = async (req, res, next) => {
  try {
    let { id } = req.params;
    await ObjectIdValidation(id);
    next();
  } catch (error) {
    handleError(res, 400, error.message);
  }
};

export default objectIdParamsValidationMiddleware;

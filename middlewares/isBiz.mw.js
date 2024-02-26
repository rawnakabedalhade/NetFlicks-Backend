import handleError from "../utils/handleError.js";

const isBizMiddleware = async (req, res, next) => {
  if (!req.userData) {
    throw new Error("you must be logged in");
  }
  if (!req.userData.isBusiness) {
    return handleError(res, 401, "You are not a business");
  }
  next();
};
export default isBizMiddleware;

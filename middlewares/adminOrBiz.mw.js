import handleError from "../utils/handleError.js";

const adminOrBizMiddleware = (req, res, next) => {
  if (!req.userData) {
    throw new Error("you must be logged in");
  }
  if (req.userData.isAdmin || req.userData.isBusiness) {
    next();
  } else {
    return handleError(
      res,
      401,
      "You don't have permission to do this action1"
    );
  }
};
export default adminOrBizMiddleware;

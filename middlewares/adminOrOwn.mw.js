import handleError from "../utils/handleError.js";

const adminOrOwn = (req, res, next) => {
  if (!req.userData) {
    throw new Error("you must be logged in");
  }
  if (req.userData.isAdmin || req.userData._id == req.params.id) {
    next();
  } else {
    return handleError(
      res,
      401,
      "You don't have permission to do this action11"
    );
  }
};
export default adminOrOwn;

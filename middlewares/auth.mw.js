import { verifyToken } from "../token/jwt.js";
import handleError from "../utils/handleError.js";
import debug from "debug";
const log = debug("app:authMiddleware");
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers["x-auth-token"]) throw new Error("No token provided");
    const payload = await verifyToken(req.headers["x-auth-token"]);
    req.userData = payload;
    next();
  } catch (err) {
    console.log(44);
    log(err.message);
    handleError(res, 401, err.message);
  }
};

export default authMiddleware;

import express from "express";
import usersRouter from "./api/users.router.js";
import moviesRouter from "./api/movies.router.js";
import handleError from "../utils/handleError.js";
const router = express.Router();

router.use("/users", usersRouter);

// http://localhost:5000/api/movies
router.use("/movies", moviesRouter);

// http://localhost:5000/api
router.get("/", (req, res) => {
  res.send("api sub route");
});

router.use((req, res) => {
  handleError(res, 404, "not found");
});

export default router;

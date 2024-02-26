import express from "express";
import bodyValidationMiddleWare from "../../middlewares/bodyValidation.mw.js";
import moviesSchemaValidation from "../../validation/joi/movies/movies.js";
import {
  createMovieController,
  deleteMovieController,
  getAllMoviesController,
  getAllMyMoviesController,
  getMovieByIdController,
  patchLikeMovieController,
  updateMovieController,
} from "../../controllers/movies.controller.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import isBizMiddleware from "../../middlewares/isBiz.mw.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
import adminOrBizMiddleware from "../../middlewares/adminOrBiz.mw.js";

const router = express.Router();

// http://localhost:5000/api/movies
router.get("/", getAllMoviesController);

router.get("/my-movies", authMiddleware, getAllMyMoviesController);

router.get("/:id", objectIdParamsValidationMiddleware, getMovieByIdController);

router.put(
  "/:id",
  authMiddleware,
  adminOrBizMiddleware,
  objectIdParamsValidationMiddleware,
  bodyValidationMiddleWare(moviesSchemaValidation),
  updateMovieController
);

router.delete(
  "/:id",
  authMiddleware,
  adminOrBizMiddleware,
  objectIdParamsValidationMiddleware,
  deleteMovieController
);

//like
router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  patchLikeMovieController
);

router.post(
  "/",
  authMiddleware,
  isBizMiddleware,
  bodyValidationMiddleWare(moviesSchemaValidation),
  createMovieController
);
export default router;

import express from "express";
import nodemailer from "nodemailer";
import {
  deleteUserController,
  getAllUsersController,
  loginController,
  registerController,
  updateUserController,
  patchIsBizController,
  getUserByIdController,
  forgotPasswordController,
  resetPasswordController,
} from "../../controllers/users.controller.js";
import bodyValidationMiddleWare from "../../middlewares/bodyValidation.mw.js";
import {
  editUserValidation,
  loginValidation,
  patchUserValidation,
  registerValidation,
} from "../../validation/validationAdapter.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import User from "../../model/mongodb/users/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

//http://localhost:5000/api/users
router.get("/", getAllUsersController);

router.get(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  getUserByIdController
);

router.post(
  "/login",
  bodyValidationMiddleWare(loginValidation),
  loginController
);

router.post(
  "/register",
  bodyValidationMiddleWare(registerValidation),
  registerController
);

router.put(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  bodyValidationMiddleWare(editUserValidation),
  updateUserController
);

router.delete(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  deleteUserController
);

router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  patchIsBizController
);
// Route for sending reset password email
router.post("/forgot-password", forgotPasswordController);

// Route for resetting password
router.post("/reset-password/:id/:token", resetPasswordController);

export default router;

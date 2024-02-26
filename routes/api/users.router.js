import express from "express";
import {
  deleteUserController,
  getAllUsersController,
  loginController,
  registerController,
  updateUserController,
  patchIsBizController,
  getUserByIdController,
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
export default router;

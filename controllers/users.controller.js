import {
  getAllUsers,
  updateUser,
  deleteUser,
  patchIsBiz,
  getUserById,
} from "../model/dbAdapter.js";
import { getUserByEmail } from "../model/dbAdapter.js";
import handleError from "../utils/handleError.js";
import { generateHash, cmpHash } from "../utils/bcrypt.js";
import { createUser } from "../model/dbAdapter.js";
import { generateToken } from "../token/jwt.js";
import isLockoutExpired from "../utils/isLockOutExpired.js";
import updateUserFailedLoginInfo from "../utils/updateUserFailedLoginInfo.js";
import nodemailer from "nodemailer";
import debug from "debug";

const loginController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    if (!userFromDB) {
      throw new Error("invalid email or password");
    }
    let passwordHash = await cmpHash(req.body.password, userFromDB.password);
    if (!passwordHash) {
      // Increment failed login attempts count
      let endOfLockout = isLockoutExpired(userFromDB.lastFailedLoginTimestamp);
      userFromDB.failedLoginAttempts++;
      userFromDB = await updateUserFailedLoginInfo(userFromDB);

      // Check if the user should be locked out
      if (userFromDB.failedLoginAttempts === 3 && !endOfLockout) {
        throw new Error(
          "Your account is temporarily locked. Please try again later."
        );
      }

      throw new Error("Invalid email or password");
    }

    // Reset failed login attempts count upon successful login
    userFromDB.failedLoginAttempts = 0;
    let user = await updateUserFailedLoginInfo(userFromDB);
    let token = await generateToken({
      _id: user._id,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    });
    const tramsporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rawnakabedalhade@gmail.com",
        pass: process.env.PASS_MAILER,
      },
    });
    const mailOptions = {
      from: "rawnakabedalhade@gmail.com",
      to: user.email,
      subject: "NetFlicks notification",
      text: "Welcome back to our website ,your login is successful",
      html: `
    <div style="font-family: Arial, sans-serif; color: #fff; background-color: #000; padding: 20px;">
  <h2 style="color: #db0000;">Welcome back, ${
    user.name.first + " " + user.name.last
  }</h2>
  <p style="font-size: 16px;">We look forward to serving you!, NetFlicks Team.</p>
</div>
  `,
    };
    tramsporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        let logger = debug("app:loginController");
        logger("error sending email", error);
      } else {
        console.log("Email sent:" + info.response);
      }
    });
    res.json(token);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const registerController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    if (userFromDB) {
      throw new Error("User already exists");
    }
    let passwordHash = await generateHash(req.body.password);
    req.body.password = passwordHash;
    let newUser = await createUser(req.body);
    newUser.failedLoginAttempts = 0; // Reset failed login attempts count
    await updateUser(newUser._id, newUser);
    newUser.password = undefined;
    const tramsporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rawnakabedalhade@gmail.com",
        pass: process.env.PASS_MAILER,
      },
    });
    const mailOptions = {
      from: "rawnakabedalhade@gmail.com",
      to: newUser.email,
      subject: "NetFlicks notification",
      text: "Your registeration is successful",
      html: `
 <div style="font-family: Arial, sans-serif; color: #fff; background-color: #000; padding: 20px;">
  <h2 style="color: #db0000;">Welcome back, ${
    user.name.first + " " + user.name.last
  }</h2>
  <p style="font-size: 16px;">We look forward to serving you! NetFlicks Team.</p>
</div>

  `,
    };
    tramsporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        let logger = debug("app:registerController");
        logger("error sending email", error);
      } else {
        console.log("Email sent:" + info.response);
      }
    });
    res.send("register User");
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const getAllUsersController = async (req, res) => {
  try {
    let users = await getAllUsers();
    res.json(users);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    let user = await getUserById(req.params.id);
    user.password = undefined;
    res.json(user);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const updateUserController = async (req, res) => {
  try {
    let userFromDB = await updateUser(req.params.id, req.body);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const deleteUserController = async (req, res) => {
  try {
    let userFromDB = await deleteUser(req.params.id);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const patchIsBizController = async (req, res) => {
  try {
    let user = await getUserById(req.params.id);
    let userFromDB = await patchIsBiz(req.params.id, !user.isBusiness);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

export {
  loginController,
  registerController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  patchIsBizController,
  getUserByIdController,
};

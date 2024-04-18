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
import User from "../model/mongodb/users/User.js";

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
    newUser.name.first + " " + newUser.name.last
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

const forgotPasswordController = async (req, res) => {
  try {
    let user = await getUserByEmail(req.body.email);
    console.log(user);
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    let token = await generateToken({
      _id: user._id,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rawnakabedalhade@gmail.com",
        pass: process.env.PASS_MAILER,
      },
    });

    let mailOptions = {
      from: "rawnakabedalhade@gmail.com",
      to: req.body.email,
      subject: "Reset Password Link",
      subject: "Reset Password Link",
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .link {
            color: #007bff;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Reset Password Link</h2>
          </div>
          <p>Dear User,</p>
          <p>You have requested to reset your password. Please click on the link below to reset your password:</p>
          <p><a href="http://localhost:3000/reset-password/${user._id}/${token}" class="link">Reset Password Link</a></p>
          <p>Thank you,</p>
          <p class="footer">NetFlicks Support Team</p>
        </div>
      </body>
    </html>
  `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
    res.send("Check Your Email");
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const resetPasswordController = async (req, res) => {
  try {
    let { id, token } = req.params;
    const { password } = req.body;
    let user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }
    let passwordHash = await generateHash(req.body.password);
    req.body.password = passwordHash;
    let updatedUser = await User.findByIdAndUpdate(id, {
      password: passwordHash,
    });
    updatedUser.password = undefined;
    res.send("password updated");
  } catch (err) {
    // Handle errors
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
  forgotPasswordController,
  resetPasswordController,
};

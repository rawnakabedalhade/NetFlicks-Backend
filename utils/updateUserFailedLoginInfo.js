import User from "../model/mongodb/users/User.js";
const updateUserFailedLoginInfo = async (user) => {
  try {
    user.lastFailedLoginTimestamp = new Date(); // Update last failed login timestamp
    // Update user document in the database
    let user1 = await User.findByIdAndUpdate(user._id, {
      failedLoginAttempts: user.failedLoginAttempts,
      lastFailedLoginTimestamp: user.lastFailedLoginTimestamp,
    });
    return user1;
  } catch (error) {
    console.error("Error updating user failed login info:", error);
    throw new Error("Failed to update user failed login info");
  }
};
export default updateUserFailedLoginInfo;

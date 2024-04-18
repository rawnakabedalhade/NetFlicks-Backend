import User from "./User.js";

const createUser = (userData) => {
  //save user in mongoose
  let user = new User(userData);
  return user.save();
};

const getAllUsers = () => {
  return User.find();
};

const getUserById = (id) => {
  return User.findById(id);
};
const getUserByEmail = (email) => {
  return User.findOne({ email });
};
const updateUser = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, { new: true });
};
const patchIsBiz = (id, isBusiness) => {
  return User.updateOne({ _id: id }, { isBusiness: isBusiness });
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  patchIsBiz,
  getUserByEmail,
};

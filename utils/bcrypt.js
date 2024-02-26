import bcrypt from "bcryptjs";

const generateHash = (password) => {
  return bcrypt.hash(password, 10);
};

const cmpHash = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export { generateHash, cmpHash };

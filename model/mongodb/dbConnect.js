import mongoose from "mongoose";
import chalk from "chalk";
import debug from "debug";
const connectToMongo = () => {
  const log = debug("app:connectToMongo");
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_CON_STR + "moviesdb")
      .then(() => {
        log(chalk.magentaBright.bold("connected to Mongodb"));
        resolve();
      })
      .catch((err) => {
        log(chalk.redBright.bold("not connected to Mongodb", err));
        reject(err);
        process.exit(1); //drop the server
      });
  });
};
export default connectToMongo;

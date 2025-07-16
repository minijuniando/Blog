import mongoose from "mongoose";
import { env } from "../common/env";
import chalk from "chalk";

try {
  await mongoose.connect(env.MONGODB_URI);
  console.log(chalk.green("MONGODB CONNECTED"));
} catch (err) {
  console.error(`ERROR TO CONNECT TO MONGO: ${err}`);
  throw err;
}

export const db = mongoose;


import mongoose from "mongoose";
import { env } from "../common/env";

try {
  await mongoose.connect(env.MONGODB_URI);
  console.log("DATABASE CONNECTED");
} catch (err) {
  console.error(`ERROR TO CONNECT TO MONGO: ${err}`);
  throw err;
}

export const db = mongoose;


import mongoose from "mongoose";
import { env } from "../common/env";

try {
  await mongoose.connect(env.MONGO_DB_URI);
} catch (err) {
  console.error(`ERROR TO CONNECT TO MONGO: ${err}`);
  throw err;
}

try {
  const articleSchema = new mongoose.Schema({ name: String });
} catch (err) {

}

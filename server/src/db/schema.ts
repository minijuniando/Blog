import mongoose from "mongoose";
import { env } from "../common/env";

try {
  await mongoose.connect(env.MONGO_DB_URI);
} catch (err) {
  console.error(`ERROR TO CONNECT TO MONGO: ${err}`);
  throw err;
}

const articleSchema = new mongoose.Schema({ name: String });
export const Article = await mongoose.model("articles", articleSchema);


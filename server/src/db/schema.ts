import mongoose from "mongoose";
import { env } from "../common/env";

try {
  await mongoose.connect(env.MONGODB_URI);
} catch (err) {
  console.error(`ERROR TO CONNECT TO MONGO: ${err}`);
  throw err;
}

const articleSchema = new mongoose.Schema({ name: String });
export const Article = await mongoose.model("articles", articleSchema);

const techTagSchema = new mongoose.Schema({ name: String });
export const TechTag = await mongoose.model("tech_tags", techTagSchema);

const userSchema = new mongoose.Schema({ name: String, email: String, password: String });
export const User = await mongoose.model("users", userSchema);


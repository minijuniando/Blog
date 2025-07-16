import { db } from "../client";

const articleSchema = new db.Schema({
  name: String
});
export const Article = await db.model("articles", articleSchema);

const techTagSchema = new db.Schema({ name: String });
export const TechTag = await db.model("tech_tags", techTagSchema);

const userSchema = new db.Schema({ name: String, email: String, password: String });
export const User = await db.model("users", userSchema);


import { db } from "../client";

const articleSchema = new db.Schema({
  title: String,
  userId: String,

});

export const Article = db.model("articles", articleSchema);

const techTagSchema = new db.Schema({
  name: String
});

export const TechTag = db.model("tech_tags", techTagSchema);

const userSchema = new db.Schema({
  name: String,
  email: String,
  password: String
});

export const User = db.model("users", userSchema);

const likeSchema = new db.Schema({
  userId: String,
  postId: String,
});



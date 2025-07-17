import crypto from "node:crypto";

console.log(crypto.randomBytes(64).toString("hex")); //hash aleatório pra colocar no env.TOKEN_SECRET

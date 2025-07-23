import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../common/env";
import { db } from "../../db/client";

const router = Router();

router.post("/", async (request, response) => {
	const { email, password } = request.body;
});

export const loginRoute = router;

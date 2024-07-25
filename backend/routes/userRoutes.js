import express from "express";

import { getAllUsers, signUp, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);

export default userRouter;

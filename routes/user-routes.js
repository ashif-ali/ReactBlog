import express from "express";
import { getAllUsers, login, signup } from "../controller/user-controller.js"; // Corrected path

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signup", signup);
router.post("/login", login);

export default router;

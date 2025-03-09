import express from "express";
import { register, login, updateProfile } from "../controllers/userController";
import { protect } from "../middlewares/auth";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.patch("/update", protect, updateProfile);
export default router;

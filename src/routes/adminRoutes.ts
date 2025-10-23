import express from "express";
import { registerAdmin, login } from "../controllers/authcontroller";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", login);

export default router;

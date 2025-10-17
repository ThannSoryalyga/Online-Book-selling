import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminController";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

// Admin routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", authenticate, authorizeRoles(["admin"]), logoutAdmin);

export default router;

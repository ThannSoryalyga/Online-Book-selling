// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
// } from "../controllers/authcontroller";
// import { authenticate } from "../middlewares/authMiddleware";

// const router = express.Router();

// // User routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", authenticate, logoutUser);

// export default router;
import express from "express";
import {
  createUserService,
  loginUserService,
} from "../controllers/authcontroller";

const router = express.Router();

// Register new user
router.post("/register", createUserService);

// Login user
router.post("/login", loginUserService);

export default router;

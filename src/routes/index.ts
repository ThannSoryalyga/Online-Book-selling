import { Router } from "express";
// import bookRoute from "./bookRoutes";

const router = Router();

// router.use("/books", bookRoute);
router.use("/login", require("./login").default);
router.use("/register", require("./register").default);
export default router;

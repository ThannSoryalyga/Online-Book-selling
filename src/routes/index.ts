import { Router } from "express";
import bookRoute from "./bookRoutes";
import cartRoute from "./cartRoutes";

const router = Router();

// router.use("/books", bookRoute);
router.use("/login", require("./login").default);
router.use("/register", require("./register").default);
router.use("/books", bookRoute);
router.use("/cart", cartRoute);

export default router;

import { Router } from "express";
import bookRoute from "./bookRoutes";
import userRoute from "./userRouter";

const router = Router();

// router.use("/books", bookRoute);
router.use("/login", require("./login").default);
router.use("/register", require("./register").default);
router.use("/books", bookRoute);
router.use("/users", userRoute);

export default router;

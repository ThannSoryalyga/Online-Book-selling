import { Router } from "express";
import bookRoute from "./bookRoute";
import categoryRoute from "./categoryRoute";
import authRoute from "./authRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/books", bookRoute);
router.use("/categories", categoryRoute);

export default router;

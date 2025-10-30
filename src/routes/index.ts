import { Router } from "express";
import bookRoute from "./bookRoute";
import categoryRoute from "./categoryRoute";
import authRoute from "./authRoute";
import authorRoute from "./authorRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/books", bookRoute);
router.use("/categories", categoryRoute);
router.use("/authors", authorRoute);

export default router;

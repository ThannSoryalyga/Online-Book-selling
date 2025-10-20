import { Router } from "express";
import { createUser } from "@/controllers/UseControllers";

const router = Router();

router.post("/", createUser);

export default router;

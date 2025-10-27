import { Request, Response } from "express";
import {
  registerService,
  loginService,
  logoutService,
} from "@/services/authService";

export const registerController = async (req: Request, res: Response) => {
  const result = await registerService(req, res);
  return res.json(result);
};

export const loginController = async (req: Request, res: Response) => {
  const result = await loginService(req, res);
  return res.json(result);
};

export const logoutController = async (req: Request, res: Response) => {
  const result = await logoutService(req, res);
  return res.json(result);
};

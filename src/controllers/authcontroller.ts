import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/AuthModel";
import Role from "../models/RoleModel";
import dotenv from "dotenv";
import { access } from "fs";

// Define RoleType interface
interface RoleType {
  _id: string;
  name: string;
  permissions: string[];
}

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register user
export const createUserService = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname, username, phone, age } =
      req.body;
    const role = await Role.findOne({ name: "user" });
    if (!role) return res.status(400).json({ message: "Role not found" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      firstname,
      lastname,
      username,
      password: hashed,
      roleId: "customer",
      phone,
      age,
    });
    res.status(200).json({
      message: "User registered",
      user: user,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Login user
export const loginUserService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate<{ roleId: RoleType }>(
      "roleId"
    );
    if (!user || user.roleId?.name !== "user")
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id, role: "user" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// Logout user (client removes token)
export const logoutUser = (_req: Request, res: Response) => {
  res.json({ message: "User logged out. Remove token on client." });
};

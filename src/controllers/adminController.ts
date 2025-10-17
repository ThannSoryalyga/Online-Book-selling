import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/AuthModel";
import Role from "../models/RoleModel";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register admin
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname, username, phone, age } =
      req.body;
    const role = await Role.findOne({ name: "admin" });
    if (!role) return res.status(400).json({ message: "Role not found" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await User.create({
      email,
      firstname,
      lastname,
      username,
      password: hashed,
      roleId: role._id,
      phone,
      age,
    });
    res.status(201).json({ message: "Admin registered", userId: admin._id });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Login admin
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email }).populate("roleId");
    if (!admin || (admin.roleId as any)?.name !== "admin")
      return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Logout admin
export const logoutAdmin = (_req: Request, res: Response) => {
  res.json({ message: "Admin logged out. Remove token on client." });
};

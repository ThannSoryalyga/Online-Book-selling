import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import Role from "../models/RoleModel";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register user (default role = user)
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, userName, phone, age } =
      req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const role = await Role.findOne({ name: "user" });
    if (!role) return res.status(400).json({ message: "Role not found" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      firstName,
      lastName,
      userName,
      phone,
      age,
      roleId: role._id,
    });

    const token = jwt.sign(
      { id: user._id, role: (user.roleId as any).name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Register admin (only admin can do)
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, userName, phone, age } =
      req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const role = await Role.findOne({ name: "admin" });
    if (!role) return res.status(400).json({ message: "Role not found" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      password: hashed,
      firstName,
      lastName,
      userName,
      phone,
      age,
      roleId: role._id,
    });

    const token = jwt.sign(
      { id: admin._id, role: (admin.roleId as any).name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(201)
      .json({ message: "Admin registered successfully", admin, token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Login user/admin
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("roleId");
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: (user.roleId as any).name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
      name: user.firstName + " " + user.lastName,
      role: (user.roleId as any).name,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

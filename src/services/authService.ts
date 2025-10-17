import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/AuthModel";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

//Register a new user

export const createUserService = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // 1️⃣ Check if user already exists
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    // 2️⃣ Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // 3️⃣ Create the new user
    const user = await User.create({
      email,
      username,
      password: hashed,
    });

    // 4️⃣ Respond with JSON
    res.status(201).json({
      message: "User registered successfully",
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

// Login user or admin

export const loginUserService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email
    const user = await User.findOne({ email }).populate("roleId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Check password match
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3️⃣ Create JWT token
    const token = jwt.sign({ id: user._id, role: user.roleId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // 4️⃣ Respond with JSON
    res.status(200).json({
      message: "User registered",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

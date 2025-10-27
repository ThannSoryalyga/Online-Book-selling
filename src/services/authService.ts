import { Request, Response } from "express";
import userModels from "@/models/userModels";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId: string, roles: string[]): string => {
  return jwt.sign({ userId, roles }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const registerService = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, userName, password, phone, age } =
      req.body;
    const existingEmail = await userModels.findOne({ email });
    const existPhone = await userModels.findOne({ phone });
    if (existingEmail) {
      res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }
    if (existPhone) {
      res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModels({
      email,
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      phone,
      age,
      roles: ["user"],
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      user: newUser,
      message: "User registered successfully.",
    });

    const token = generateToken(newUser._id, newUser.roles);
    res.status(201).json({
      success: true,
      user: newUser,
      token,
      message: "User registered successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed.",
    });
  }
};

export const loginService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existEmail = await userModels.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    const existPassword = await bcrypt.compare(password, existEmail?.password);
    if (!existPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    const token = generateToken(existEmail._id, existEmail.roles);
    return res.status(200).json({
      success: true,
      user: existEmail,
      token,
      message: "User logged in successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed.",
    });
  }
};

export const logoutService = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed.",
    });
  }
};

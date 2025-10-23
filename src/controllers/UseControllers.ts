import { Request, Response } from "express";
import { AppDataSource } from "@/config/data-source";
import { User } from "@/models/UserModel";
import bcrypt from "bcrypt";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await userRepo.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: "Email already used" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = userRepo.create({ name, email, password: hashed });
    await userRepo.save(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

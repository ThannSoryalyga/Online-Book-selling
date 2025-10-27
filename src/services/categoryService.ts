import { Request, Response } from "express";

export const createCategoryService = async (req: Request, res: Response) => {
    try {
        const { name, des } = req.body;
        // implement create category logic here
        return res.status(201).json({ status: "success", data: { name, des } });
    } catch (error: any) {
        return res.status(400).json({
            status: "error",
            message: error.message
        });
    }
}
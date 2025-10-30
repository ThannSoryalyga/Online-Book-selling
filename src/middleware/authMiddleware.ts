import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decode as JwtPayload;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export const authorize = (allowRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.roles;
    if (
      !userRole ||
      !allowRoles.some((role: string) => allowRoles.includes(role))
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    next();
  };
};

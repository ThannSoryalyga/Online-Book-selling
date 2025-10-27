import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("authorization")?.replace("Bearer ", "");
    if (!token){
      return res.status(401).json({message:"No token provided"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload | string;
    req.user = decoded as JwtPayload;
    next();
  } catch (error:any){
    return res.status(401).json({message: "Token is not valid"});
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.roles;
    if(!userRole || !userRole.some((role: string) => allowedRole.includes(role))){
      return res.status(401).json({message: "Forbidden"});
    }
    next();
  }
}
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthCustomRequest } from "../types/authTokenCustomRequest";

export const authenticateUser = (req: AuthCustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken; 
  if (!token) {
    req.user = undefined;
    return next();
}

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as { id: number, role : string };
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
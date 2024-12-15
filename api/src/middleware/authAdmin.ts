import { NextFunction, Response } from "express";
import { AuthCustomRequest } from "../types/authTokenCustomRequest";

export const authorizeAdmin = (req: AuthCustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "No token found." });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
    next(); 
  };
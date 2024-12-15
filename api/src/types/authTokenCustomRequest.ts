import { Request } from "express";

export interface AuthCustomRequest extends Request {
  user?: { 
    id: number,
    role : string
   }
}
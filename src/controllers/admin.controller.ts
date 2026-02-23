import {  Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret=process.env.JWT_SECRET as string;

export const adminOnlyApi = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, secret);
    if (decoded.role !== "admin") {
      return res.json({ message: "Only Access By Admin" });
    }
    res.json({ message: "Welcome Admin" });
  } catch {
    res.json({ message: "Invalid Token" });
  }
};

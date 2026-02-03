import {  Request, Response } from "express";
import jwt from "jsonwebtoken";

export const adminOnlyApi = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ message: "Not Authorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, "secretKey");
    if (decoded.role !== "admin") {
      return res.json({ message: "Only Access By Admin" });
    }
    res.json({ message: "Welcome Admin" });
  } catch {
    res.json({ message: "Invalid Token" });
  }
};

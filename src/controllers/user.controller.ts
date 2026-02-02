import { Request, Response } from "express";
import { login, register } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password: hashedPassword, role } = req.body;
  const user = await register(email, hashedPassword, role);
  res.json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await login(email);
  if (!user) {
    return res.json({ message: "No user available" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: "Password is not match" });
  }
  let token = jwt.sign({ id: user._id, role: user.role }, "secretKey");
  res.cookie("token", token);
  res.json(token);
};

import { Request, Response } from "express";
import { login, register } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try{
const { email, password: hashedPassword, role } = req.body;
  const user = await register(email, hashedPassword, role);
  res.status(201).json(user);
  }catch(error:any){
    res.status(400).json({message:error.message})
  }
  
};

export const loginUser = async (req: Request, res: Response) => {
  try{
const { email, password } = req.body;
  const user = await login(email);
  if (!user) {
    return res.status(404).json({ field:"email",message: "No user available" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({  field:"password", message: "Password is not match" });
  }
  let token = jwt.sign({ id: user._id, role: user.role }, "secretKey");
  res.cookie("token", token);
  res.json(token);
  }catch(error:any){
    res.status(400).json({field:"email",message:error.message})
  }
  
};

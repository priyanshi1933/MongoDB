import { Request, Response } from "express";
import { getUser, login, register } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try{
const { name,email, password: hashedPassword, role } = req.body;
  const user = await register(name,email, hashedPassword, role);
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
  res.json({token});
  }catch(error:any){
    res.status(400).json({field:"email",message:error.message})
  }
  
};


export const  getUsers=async(req:Request,res:Response)=>{
  // try{
  //   const user=await getUser();
  //   res.json(user);
  // }catch(error:any){
  //   res.status(400).json({message:"No User Available"})
  // }
  const page=Number(req.query.page) || 1;
  const limit=Number(req.query.limit) || 5;
  const result=await getUser(page,limit);
  res.json({
    currentPage:page,
    totalPages:result.totalPages,
    totalUsers:result.totalUsers,
    data:result.users
  })
}

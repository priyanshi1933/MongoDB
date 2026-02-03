import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export const register = async (
  email: string,
  password: string,
  role: "admin" | "user" = "user",
) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserModel.create({ email, password: hashedPassword, role });
};

export const login = async (email: string) => {
  const user=await UserModel.findOne({email});
  if(!user){
    throw new Error("User not found");
  }
  return await UserModel.findOne({ email });
};

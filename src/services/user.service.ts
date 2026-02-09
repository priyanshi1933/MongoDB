import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export const register = async (
  name:string,
  email: string,
  password: string,
  role: "admin" | "user" = "user",
) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserModel.create({ name,email, password: hashedPassword, role });
};

export const login = async (email: string) => {
  const user=await UserModel.findOne({email});
  if(!user){
    throw new Error("User not found");
  }
  return await UserModel.findOne({ email });
};

export const getUser=async(page:number,limit:number)=>{
  const skip=(page-1)*limit;
  const users=await UserModel.find()
              .skip(skip)
              .limit(limit);
  const totalUsers=await UserModel.countDocuments();
  return {users,totalUsers,
          totalPages:Math.ceil(totalUsers/limit)
  }
  // return await UserModel.find();
}

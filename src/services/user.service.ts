import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";


export const register=async(email:string,password:string)=>{
    const hashedPassword= await bcrypt.hash(password,10);
    return await UserModel.create({email,password:hashedPassword});
}

export const login=async(email:string)=>{
    return await UserModel.findOne({email});
}
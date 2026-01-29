import { ProductModel } from "../models/product.model";

export const createProduct=async(data:any)=>{
    return await ProductModel.create(data);
}

export const readProducts=async()=>{
    return await ProductModel.find();
}

export const readProduct=async(id:string)=>{
    return await ProductModel.findById(id);
}

export const updateProduct=async(id:string,data:any)=>{
    return await ProductModel.findByIdAndUpdate(id,data,{new:true});
}

export const deleteProduct=async(id:string)=>{
    return await ProductModel.findByIdAndDelete(id);
}

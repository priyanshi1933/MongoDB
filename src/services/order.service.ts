import { OrderModel } from "../models/order.model";

export const createOrder = async (productId: string, data: any) => {
  return await OrderModel.create(data);
};

export const getProductByOrder = async (id: string) => {
  return await OrderModel.findById(id).populate("productId");
};

export const getAllOrder = async () => {
  return await OrderModel.find().populate("productId");
};

export const updateOrder=async(id:string,data:any)=>{
    return await OrderModel.findByIdAndUpdate(id,data,{new:true})
}

export const deleteOrder=async(id:string)=>{
    return await OrderModel.findByIdAndDelete(id);
}
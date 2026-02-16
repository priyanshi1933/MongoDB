import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";

export const createOrder = async (productId: string,quantity:number) => {
  const product=await ProductModel.findById(productId);
  if(!product){
    throw new Error("Product not found")
  }
  const totalAmount=product.price*quantity;
  return await OrderModel.create({productId,quantity,totalAmount});
};

export const getProductByOrder = async (id: string) => {
  return await OrderModel.findById(id).populate("productId");
};

// export const getAllOrder = async () => {
//   return await OrderModel.find().populate("productId");
// };

export const getAllOrder=async(page:number,limit:number)=>{
  const skip=(page-1)*limit;
  const orders=await OrderModel.find()
                .skip(skip)
                .limit(limit)
                .populate("productId");
  const totalOrders=await OrderModel.countDocuments();
  return {orders,totalOrders,
    totalPages:Math.ceil(totalOrders/limit)
  }
}

export const updateOrder=async(id:string,data:any)=>{
    return await OrderModel.findByIdAndUpdate(id,data,{new:true})
}

export const deleteOrder=async(id:string)=>{
    return await OrderModel.findByIdAndDelete(id);
}
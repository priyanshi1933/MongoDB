import { ProductModel } from "../models/product.model";

export const createProduct = async (
  title: string,
  price: number,
  image: string,
) => {
  return await ProductModel.create({ title, price, image });
};

export const readProducts = async (
  page: number,
  limit: number,
  search?: string,
) => {
  const query = search ? { title: { $regex: search, $options: "i" } } : {};
  const skip = (page - 1) * limit;
  const products = await ProductModel.find(query).skip(skip).limit(limit);
  const totalProducts = await ProductModel.countDocuments(query);
  return {
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
  };
  // return await ProductModel.find();
};

export const readProduct = async (id: string) => {
  return await ProductModel.findById(id);
};

export const updateProduct = async (id: string, data: any) => {
  return await ProductModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};

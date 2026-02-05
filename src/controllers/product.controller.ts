import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  readProduct,
  readProducts,
  updateProduct,
} from "../services/product.service";
import fs from "fs"
import path from "path";
import { productValidation } from "../validation/product.validation";

export const create = async (req: Request, res: Response) => {
  const dataToValidate={...req.body,image:req.file?req.file.filename:undefined};
  const {error}=productValidation.validate(dataToValidate);
  if(error){
    res.status(400).json({message:error.details[0].message})
  }
  try {
    const {title,price}=req.body;
    const image=req.file!.filename;
    const product = await createProduct(title,Number(price),image);
    res.json(product);
  } catch (error:any) {
    res.status(400).json({ message: "Record not inserted" });
  }
};

export const readAll = async (req: Request, res: Response) => {
  try {
    const product = await readProducts();
    res.json(product);
  } catch (error) {
    res.json({ message: "Records not available" });
  }
};

export const readOne = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const product = await readProduct(id);
    res.json(product);
  } catch (error) {
    res.json({ message: "Cannot find this record" });
  }
};

// export const update = async (req: Request, res: Response) => {
//   try {
//     const id = Object(req.params.id);
//     const updated = await updateProduct(id, req.body);
//     res.json(updated);
//   } catch (error) {
//     res.json({ message: "Record is not update" });
//   }
// };

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData: any = { ...req.body };
    if (updateData.price) {
      updateData.price = Number(updateData.price);
    }
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updated = await updateProduct(id, updateData);
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Record is not updated" });
  }
};


export const deleteProd = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const deleted = await deleteProduct(id);
    if(deleted?.image){
      const filePath=path.join("uploads/",deleted.image)
      fs.unlink(filePath,(err)=>{
        if(err)
          console.log("Failed to Delete:",err);
      })
    }
    res.json(deleted);
  } catch (error) {
    res.json({ message: "Record is not delete" });
  }
};

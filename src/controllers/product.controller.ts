import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  readProduct,
  readProducts,
  updateProduct,
} from "../services/product.service";

export const create = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.json({ message: "Record not inserted" });
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

export const update = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const updated = await updateProduct(id, req.body);
    res.json(updated);
  } catch (error) {
    res.json({ message: "Record is not update" });
  }
};

export const deleteProd = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const deleted = await deleteProduct(id);
    res.json(deleted);
  } catch (error) {
    res.json({ message: "Record is not delete" });
  }
};

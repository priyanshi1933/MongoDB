import { Request, Response } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getProductByOrder,
  updateOrder,
} from "../services/order.service";

export const create = async (req: Request, res: Response) => {
  try {
    const productId = req.body.productId;
    const order = await createOrder(productId, req.body);
    res.json(order);
  } catch (error) {
    res.json({ message: "Record not inserted" });
  }
};

export const readById = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const order = await getProductByOrder(id);
    res.json(order);
  } catch (error) {
    res.json({ message: "Record not found" });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const order = await getAllOrder();
    res.json(order);
  } catch (error) {
    res.json({ message: "No Record" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const updated = await updateOrder(id, req.body);
    res.json(updated);
  } catch (error) {
    res.json({ message: "Record is not updated" });
  }
};

export const delOrder = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const deleted = await deleteOrder(id);
    res.json(deleted);
  } catch (error) {
    res.json({ message: "Record is not deleted" });
  }
};

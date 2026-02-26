import { Request, Response } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getProductByOrder,
  updateOrder,
} from "../services/order.service";
import logger from "../utils/logger";

export const create = async (req: Request, res: Response) => {
  try {
    const {productId,quantity,userId} = req.body;
   
    const order = await createOrder(productId,quantity,userId);
    res.json(order);
  } catch (error) {
    logger.error(error);
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

// export const read = async (req: Request, res: Response) => {
//   try {
//     const order = await getAllOrder();
//     res.json(order);
//   } catch (error) {
//     res.json({ message: "No Record" });
//   }
// };

export const read=async(req:Request,res:Response)=>{
  const page=Number(req.query.page) || 1;
  const limit=Number(req.query.limit) || 5;
  const result=await getAllOrder(page,limit);
  res.json({
    currentPage:page,
    totalPages:result.totalPages,
    totalOrders:result.totalOrders,
    data:result.orders
  })
}

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

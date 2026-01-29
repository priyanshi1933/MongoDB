import express from 'express';
import * as productcontroller from "../controllers/product.controller"
import * as ordercontroller from "../controllers/order.controller"

const router=express.Router();

router.post("/products",productcontroller.create);
router.get("/products",productcontroller.readAll);
router.get("/products/:id",productcontroller.readOne);
router.put("/products/:id",productcontroller.update);
router.delete("/products/:id",productcontroller.deleteProd);

router.post("/orders",ordercontroller.create);
router.get("/orders/:id",ordercontroller.readById);
router.get("/orders",ordercontroller.read);
router.put("/orders/:id",ordercontroller.update);
router.delete("/orders/:id",ordercontroller.delOrder);

export default router;
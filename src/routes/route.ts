import express from 'express';
import * as productcontroller from "../controllers/product.controller"
import * as ordercontroller from "../controllers/order.controller"
import * as usercontroller from "../controllers/user.controller"
import * as admincontroller from "../controllers/admin.controller"
import upload from '../config/multer';
import { verifyToken } from '../middleware/auth';


const router=express.Router();

router.post("/products",upload.single("image"),productcontroller.create);
router.get("/products",productcontroller.readAll);
router.get("/products/:id",productcontroller.readOne);
router.put("/products/:id",upload.single("image"),productcontroller.update);
router.delete("/products/:id",productcontroller.deleteProd);

router.post("/orders",verifyToken,ordercontroller.create);
router.get("/orders/:id",ordercontroller.readById);
router.get("/orders",ordercontroller.read);
router.put("/orders/:id",ordercontroller.update);
router.delete("/orders/:id",ordercontroller.delOrder);

router.post("/register",usercontroller.registerUser);
router.post("/login",usercontroller.loginUser);
router.get("/users",usercontroller.getUsers);

router.get("/admin",admincontroller.adminOnlyApi);

export default router;
import mongoose from "mongoose";

import { ProductModel } from "./models/product.model";

mongoose.connect("mongodb://localhost:27017/ts_demo")
.then(()=>console.log("Connected to mongodb"))
.catch((err)=>console.error("Connection err: ",err))

const newProd=new ProductModel({
    title:"Bag",
    price:5000
})

newProd.save()
.then(()=>console.log("Product Saved"))
.catch((err)=>console.error(err))
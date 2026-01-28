import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document{
    title:string,
    price:number
}

const ProductSchema:Schema<IProduct>=new Schema<IProduct>({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

export const ProductModel=mongoose.model<IProduct>("Product",ProductSchema);
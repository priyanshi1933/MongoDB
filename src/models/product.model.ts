import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document{
    title:string,
    price:number,
    image:string
}

const ProductSchema:Schema<IProduct>=new Schema<IProduct>({
    title:{
        type:String,
        required:true,
        index:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
ProductSchema.index({title:1,price:1})
export const ProductModel=mongoose.model<IProduct>("Product",ProductSchema);
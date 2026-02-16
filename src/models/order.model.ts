import mongoose,{Schema,Document,Types} from "mongoose";

export interface IOrder extends Document{
    productId:Types.ObjectId,
    quantity:number,
    totalAmount:number
}

const OrderSchema:Schema<IOrder>=new Schema<IOrder>({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }
})

export const OrderModel=mongoose.model<IOrder>("Order",OrderSchema);
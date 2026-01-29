import mongoose,{Schema,Document} from "mongoose";

export interface IOrder extends Document{
    productId:mongoose.Schema.Types.ObjectId,
    status:string
}

const OrderSchema:Schema<IOrder>=new Schema<IOrder>({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    status:{
        type:String,
        required:true
    }
})

export const OrderModel=mongoose.model<IOrder>("Order",OrderSchema);
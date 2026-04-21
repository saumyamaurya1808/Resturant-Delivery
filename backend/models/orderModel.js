import mongoose from "mongoose";
// import auth from "../middleware/auth";

const orderSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    items:{type:Array, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, default:"Food Processing"},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default:false},

})

// const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);
const orderModel = (mongoose.models && mongoose.models.order)
  ? mongoose.models.order
  : mongoose.model("order", orderSchema);
export default orderModel;
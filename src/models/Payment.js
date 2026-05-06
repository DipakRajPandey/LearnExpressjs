import mongoose from "mongoose";

const paymentSchema=mongoose.Schema({
   transactionId:{type:String}
})
export default mongoose.model("Payment",paymentSchema)
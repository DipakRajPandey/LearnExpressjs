import mongoose from "mongoose";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
} from "../constant/orderStatus.js";
const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity must be at least 1"],
      },
    },
  ],
  status: {
    type: String,
    default: ORDER_STATUS_PENDING,
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CANCELLED,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_SHIPPED,
    ],
  },
  shippingAddress:{
 city: {
      required: [true, "City is required "],
      type: String,
    },
    province: String,
    street: String,
    country: {
      default: "Nepal",
      type: String,
    },
  },
  orderNumber:{type:String,required:[true,"Order number is required"]},
  totalPrice:{
    type:Number,
    required:[true,"Total Price is required"]
  },
  payment:{
    type:mongoose.Schema.ObjectId,
    ref:"Payment"
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    immutable:true
  }
});
export default mongoose.model("Order",orderSchema)
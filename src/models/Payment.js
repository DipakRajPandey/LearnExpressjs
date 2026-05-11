import mongoose from "mongoose";
import {
  PAYMENT_STATUS_SUCCESS,
  PAYMENT_STATUS_PENDING,
  PAYMENT_STATUS_FAILED,
} from "../constant/payment.js";
import {
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
} from "../constant/payment.js";

const paymentSchema = mongoose.Schema({
  transactionId: { type: String },
  amount: { type: Number, required: [true, "Amount is required"] },
  status: {
    type: String,
    enum: [
      PAYMENT_STATUS_SUCCESS,
      PAYMENT_STATUS_PENDING,
      PAYMENT_STATUS_FAILED,
    ],
    default: PAYMENT_STATUS_PENDING,
  },
  method: {
    type: String,
    enum: [PAYMENT_METHOD_CARD, PAYMENT_METHOD_CASH, PAYMENT_METHOD_ONLINE],
    required: [true, "Payment methods is required"],
  },
  createdAt: { type: Date, default: Date.now(), immutable: true },
});
export default mongoose.model("Payment", paymentSchema);

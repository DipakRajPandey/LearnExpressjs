import mongoose from "mongoose";
import { date } from "zod";

const productSchema = mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  brand: { type: String },

  stock: {
    type: Number,
    default: 1,
  },

  category: String,
  price: {
    type: Number,
    required: [true, "Price is required."],
    min: [1, "Price must be greater than 1."],
    max: [1000000, "Price must be less than 10,00,000."],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Created by user id is required"],
  },
  imageUrls: { type: [String] },
  description:{type:String},
  createdAt:{type:Date,
    default:Date.now()
  }
});

export default mongoose.model("Product", productSchema);

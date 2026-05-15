import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  brand: { type: String },

  stock: {
    type: Number,
    default: 1,
  },

  category: String,
  price: {
    type: String,
    cast: `please enter Number value `,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Created by user id is required"],
  },
  imageUrls: { type: [String] },
  description:{type:String}
});

export default mongoose.model("Product", productSchema);

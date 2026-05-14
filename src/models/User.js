import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    required: [true, "User name is required"],
    type: String,
    mixLength: 50,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Length  of password  is grater then 8 "],
  },
  email: {
    required: [true, "Email is required"],
    type: String,
    validation: {
      validate: (value) => {
        const testmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return testmail.test(value);
      },
      message: "Invalid email address",
    },
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    minLength: 6,
    maxLength: 13,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  address: {
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
  role: {
    type: [String],
    enum: ["CUSTOMER", "MERCHANT", "ADMIN", "SUPER_ADMIN"],
    default: ["CUSTOMER"],
  },
  imageUrls: { type: [String] },
});

export default mongoose.model("User", userSchema);

import {z} from "zod";

export const productSchema = z.object({
  name: z
    .string({ required_error: "Product Name is required" })
    .trim()
    .min(3,"product name grater than 3 character"). max(30,        "product name  less than 20 character",
    ),
  category: z.string({ required_error: "Category is required" }).trim(),
  brand: z.string().optional(),
  price: z.number().min(1).max(100000),
  stock: z.string().default(1),
});

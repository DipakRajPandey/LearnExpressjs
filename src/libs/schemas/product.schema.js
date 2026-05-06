import z, { maxLength, minLength } from "zod";

export const productSchema = z.object({
  name: z
    .string({ required_error: "Product Name is required" })
    .trim()
    .check(minLength(3), maxLength(30), {
      invalid_error:
        "product name grater than 3 character and less than 20 character",
    }),
  category: z.string({ required_error: "Category is required" }).trim(),
  brand: z.string().optional(),
  price: z.string().min(1).max(100000),
  stock: z.string().default(1),
});

import z ,{ email, maxLength, minLength } from "zod";
import { mailRex } from "../../constant/regex.js";
import userSchema from "./user.schema.js";

export const loginSchema= z .object({
      email: z
        .string({ required_error: "Email is required " })
        .regex(mailRex, { required_error: "Email format is not valid " })
        .optional(),
      phone: z.string({ required_error: "Phone is required" }).optional(),

      password: z.string({ required_error: "Password is required" }),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either phone  or email is required ",
      path: ["email", "phone"],
    });


   export const registerSchema=userSchema;


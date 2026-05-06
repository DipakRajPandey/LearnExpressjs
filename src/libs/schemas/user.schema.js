import  z, { maxLength, minLength,regex} from "zod";
import { passwordRex, mailRex } from "../../constant/regex.js";
import {
  ADMIN_ROLE,
  MERCHANT_ROLE,
  CUSTOMER_ROLE,
  SUPER_ADMIN_ROLE,
} from "../../constant/role.js";
import { _maxLength } from "zod/v4/core";

const userSchema = z.object({
  username: z
    .string({ required_error: "User name is required " })
    .trim()
    .check(minLength(4), maxLength(50)),

  password: z
    .string({ required_error: "Password is required " })
    .trim()
    .regex(passwordRex, {
      message: "Password contain one uppercase one number and one special number",
    })
    .check(minLength(8,"password is grater than 8 character "), maxLength(20,"invalid_error: and less than 20 character")),

  email: z.string({required_error:"email is required"}).trim().regex(mailRex,{message:"Invalid email format "}),
  


  phone:z.string({required_error:"Phone number is required "}).trim().check(minLength(5,"Phone too short"),maxLength(15,"Phone too long")),
  

  isActive:z.boolean().default(true),
  
  address:z.object({
    city:z.string({required_error:"City is required"}).trim(),
    province:z.string().optional(),
    street:z.string().optional(),
    country:z.string(). default( "Nepal"),
   
  }),
  
  
  role:z.array(z.enum([CUSTOMER_ROLE,MERCHANT_ROLE,ADMIN_ROLE,SUPER_ADMIN_ROLE])).default(CUSTOMER_ROLE)

 
});

export default userSchema;
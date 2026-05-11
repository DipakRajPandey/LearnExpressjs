
import config from "../config/config.js";
import ResetPassword from "../models/ResetPassword.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";
const login = async (data) => {
  const dbData = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (!dbData) {
    throw {
      status: 400,
      message: "User not fount of this email or phone",
    };
  }

  const isPasswordMatch = await bcrypt.compareSync(
    data.password,
    dbData.password,
  );
  if (!isPasswordMatch) {
    throw {
      status: 400,
      message: "password do not match",
    };
  }

  return {
    _id: dbData._id,
    address: dbData.address,
    email: dbData.email,
    isActive: dbData.isActive,
    role: dbData.role,
    name: dbData.name,
    phone: dbData.phone,
  };
};

// register method
const register = async (data) => {
  const dbData = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (dbData) {
    throw {
      status: 409,
      message: "USer already Exist",
    };
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);

  const dbData1 = await User.create({ ...data, password: hashedPassword });
  return {
    _id: dbData1._id,
    address: dbData1.address,
    email: dbData1.email,
    isActive: dbData1.isActive,
    role: dbData1.role,
    name: dbData1.name,
    phone: dbData1.phone,
  };
};

const forgetPassword=async (email) => {
  const user=await User.findOne({email});
  if(!user){
    throw{
      status:404,
      message:"User not found"
    }
  }
  const token =crypto.randomUUID()
  const data=ResetPassword.create({userId:user._id,token:token})

  const link=`${config.app_url}/reset-password?userid=${user._id}&token=${token}`
 sendEmail({
  recipient:email,
  subject:"Reset password link",
  html: `<div
        style="
          padding: 16px;
          font-family: sans-serif
        "
      >
        <h1>Please click the link to reset your password.</h1>
        <a
          href="${link}"
          style="
            background-color: steelblue;
            color: white;
            text-decoration: none;
            padding: 8px 32px;
            border-radius: 5px;
          "
          >Reset password</a
        >
      </div>
    `
 })
  return({
    message:"Reset password link send to your email"
  })
  
}
const resetPassword=async(input)=>{
const data=await ResetPassword.findOne({
  userId:input.userId,
   expireAt:{$gt:Date.now()}
}).sort({createdAt:-1})
if(!data || data.token != input.token){
  throw{
    status:400,
    message:"Invalid User or link is expired"
  }
}

if(data.isUsed){
  throw{
    status:400,
    message:"Link is already used"
  }
}
const salt =bcrypt.genSaltSync(10);
const hashedPassword=bcrypt.hashSync(input.password,salt)
await User.findByIdAndUpdate(input.userId,{password:hashedPassword})

await ResetPassword.findByIdAndUpdate(data._id,{
  isUsed:true
})
return {message:"password is reset successfully"}
}
export default { login, register ,forgetPassword,resetPassword};

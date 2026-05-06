import User from "../models/User.js";
import bcrypt from "bcrypt";
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

  const isPasswordMatch= await bcrypt.compareSync(data.password,dbData.password)
if(!isPasswordMatch){
    throw{
        status:400,
        message:'password do not match'
    }

}


  return {_id:dbData._id,
    address:dbData.address,
    email:dbData.email,
    isActive:dbData.isActive,
    role:dbData.role,
    name:dbData.name,
    phone:dbData.phone
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

  const dbData1= await User.create({ ...data, password: hashedPassword });
    return {_id:dbData1._id,
    address:dbData1.address,
    email:dbData1.email,
    isActive:dbData1.isActive,
    role:dbData1.role,
    name:dbData1.name,
    phone:dbData1.phone
  };
};

export default { login,register };

import { createConnection } from "mongoose";
import authService from "../service/auth.service.js";
import jwt from "../utils/jwt.js";

const login = async (req, res) => {
  const input = req.body;
  console.log("in auth controller ");
  try {
    // console.log(" body in login ", input);

    const user = await authService.login(input);

    const token = jwt.createToken(user);
    res.cookie("authCookies", token, {
      maxAge: 86400 * 1000,
    });

    res.json({ ...user, token });
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const register = async (req, res) => {
  const input = req.body;

  try {
    const user = await authService.register(input);

    const token = jwt.createToken(user);
    res.cookie("authCookies", token, {
      maxAge: 86400 * 1000,
    });

    res.json({ ...user, token });
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const forgetPassword=async(req,res)=>{

  try {
    const  forget=await authService.forgetPassword(req.body?.email)
    res.json(forget);
    
  } catch (error) {
    res.status(400).send(error.message)
    
  }
}

const resetPassword=async(req,res)=>{
  try {
   
    const data=await authService.resetPassword(req.body)
    res.json(data)
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export default { login, register,forgetPassword,resetPassword };

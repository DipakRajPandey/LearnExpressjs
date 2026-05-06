import { createConnection } from "mongoose";
import authService from "../service/auth.service.js";
import jwt from "../utils/jwt.js";

const login = async (req, res) => {
  const input = req.body;
  console.log("in auth controller ")
  try {
  
    // console.log(" body in login ", input);

    const user = await authService.login(input);

  const token= jwt.createToken(user);
  res.cookie("authCookies",token,{
    maxAge:86400*1000,
  })

    res.json({...user,token});
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const register = async (req, res) => {
  const input = req.body;

  try {
   
    const user = await authService.register(input);

 const token= jwt.createToken(user);
  res.cookie("authCookies",token,{
    maxAge:86400*1000,
  })

    res.json({...user,token});
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

export default { login, register };

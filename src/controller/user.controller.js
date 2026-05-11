import { request, response } from "express";
import userService from "../service/user.service.js";

const getAllUsers = async (request, response) => {
  try {
    const users = await userService.getAllUsers();

    response.status(200).json(users);
  } catch (err) {
    response.status(400).send(err.message);
  }
};



const addUser=async(request,response)=>{
    try{
        const userDetails=request.body;
        const user= await userService.addUser(userDetails);
console.log(userDetails);
response.status(201).json({
    message:"User Created  Successfully",
    data:user
}) 
    }catch(err){
        response.status(400).send(err.message)
    }
}
const getUserById=async(request,response)=>{
    try {
        const user= await userService.getUserById(request.params.id);
        response.status(200).json(user)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export default { getAllUsers,addUser,getUserById };

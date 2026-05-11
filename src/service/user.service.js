import User from "../models/User.js"

const getAllUsers=async()=>{

return await User.find();

}
const addUser=async(userDetails)=>{
    return await User.create(userDetails);
}
const getUserById=async(id)=>{
    return await User.findById(id);
}
export default {getAllUsers,addUser,getUserById}
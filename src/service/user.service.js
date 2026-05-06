import User from "../models/User.js"

const getAllUsers=async()=>{

return await User.find();

}
const addUser=async(userDetails)=>{
    return await User.create(userDetails);
}
export default {getAllUsers,addUser}
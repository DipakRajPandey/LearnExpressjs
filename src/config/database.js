import mongoose from 'mongoose'
import config from './config.js';
const databaseConnection=async()=>{
try{

mongoose.connect(config.mongodburl)
    console.log("Data base connected successfully");
}catch(err){
 console.log(err);
}
 


}
export default databaseConnection;
import mongoose from 'mongoose'
import config from './config.js';
function databaseConnection(){

mongoose.connect(config.mongodburl).then(()=>{
    console.log("Data base connected successfully");
})    .catch((err)=>{
    console.log(err);
})


}
export default databaseConnection;
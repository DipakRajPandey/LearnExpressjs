import dotenv from "dotenv"

dotenv.config()

const config={
port :process.env.PORT || "",

mongodburl:process.env.DATABASEURL || "",

jwtsecret:process.env.JWTSECRET||"",


cloudinary:{
    cloudname:process.env.CLOUDINARY_CLOUD_NAME ||"",
    apikey:process.env.CLOUDINARY_API_KEY ||"",
    apisecret:process.env.CLOUDINARY_API_SECRET ||"" ,

}
};

export default config;
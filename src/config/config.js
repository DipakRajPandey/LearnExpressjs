import dotenv from "dotenv"

dotenv.config()

const config={
port :process.env.PORT || "",
app_url:process.env.APP_URL || "",

mongodburl:process.env.DATABASEURL || "",

jwtsecret:process.env.JWTSECRET||"",


cloudinary:{
    cloudname:process.env.CLOUDINARY_CLOUD_NAME ||"",
    apikey:process.env.CLOUDINARY_API_KEY ||"",
    apisecret:process.env.CLOUDINARY_API_SECRET ||"" ,

},
khalti:{
    khalti_api_url:process.env.KHALTI_API_URL ||"",
    khalti_secret_key:process.env.KHALTI_SECRET_KEY ||"",
    khalti_return_url:process.env.KHALTI_RETURN_URL ||"",
},
resend_email_api_key:process.env.RESEND_EMAIL_API_KEY ||""
};



export default config;
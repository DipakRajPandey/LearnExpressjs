import Express from "express"
import config from "./config/config.js";
import fs from 'fs/promises';
import productRoute from "./routes/products.route.js";
import authRouter from "./routes/auth.route.js"
import userRouter from './routes/users.route.js'
import orderRouter from'./routes/order.route.js'
import databaseConnection from "./config/database.js"
import bodyParser from "body-parser";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js"
import multer from "multer"
import cloudinaryConnection from "./config/cloudinary.js";


const app=Express();

databaseConnection();

cloudinaryConnection();
 app.use(bodyParser.json());
app.use(logger)

// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage:multer.memoryStorage() })

 // app.use((req,res,next)=>{
 //     res.send("this is middleware")
 //     next();
 // })

// for template engine  ejs 
//  app.set("view engine","ejs");


//configure for static  files  
//app.use(Express.static('./public'));

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })

// app.get("/about",(req,res)=>{
//     res.send("this is about page ")
// })


// app.get("/name/:username",(req,res)=>{
//        res.send(`hello ${req.params.username}`)
// })

// app.get("/book/:price/:author",(req,res)=>{
//        res.send(`Book price is ${req.params.price} and author of the book is ${req.params.author}`)
// })

//ejs
// app.get("/page",(req,res)=>{

//     res.render("home");
// })

//Layer
app.use('/api/product',upload.array('images', 12),productRoute)
app.use('/api/user',auth,upload.single("imageUrls"),userRouter)
app.use("/api/order",auth,orderRouter)
app.use('/api/auth',authRouter)


app.get("/", (request, response) => {
  response.json({
    status: "ok",
    version: "1.0.0",
    port: config.port,
  });
});

app.listen(config.port,()=>{
    console.log(`Server started at port ${config.port}`);
})
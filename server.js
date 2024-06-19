import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import bodyParser from "body-parser";
import errorHandler from "./middleWare/errorMiddleWare.js";
import cookieParser from "cookie-parser"

dotenv.config();



const app = express();
app.use(bodyParser.json())
app.use(cookieParser());

app.use(cors());

// Routes Middleware
app.use("/api/task",taskRoute);
app.use("/api/user",userRoute);

//Routes

app.get("/",(req,res)=>{
    res.send("Home page")
})
 
//Error Middleware
app.use(errorHandler)

const PORT = process.env.PORT  || 5000

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on PORT ${PORT}`);
    })
}).catch((err)=>console.log(err))

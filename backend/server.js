 import express from "express";
 import cors from "cors"
import { connectdb } from "./config/db.js";
 import foodrouter from "./routes/foodroute.js";
import userRouter from "./routes/userroute.js";
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";

  

 
 //app config
 const app=express();
 const port =process.env.PORT || 4000;
 
 //mongodb+srv://divvijayaprakash:1692971@cluster0.b3oczah.mongodb.net/?
  //middleware
 app.use(express.json())
 app.use(cors())

 //dbconnection
 connectdb();

 //apiendpoints
app.use('/api/food',foodrouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter )
app.use("/api/cart",cartRouter)
app.use("/api/orders",orderRouter)


 app.get("/",(req,res)=>{
    res.send("hi")
 })

 app.listen(port,()=>{
    console.log("working")
 })
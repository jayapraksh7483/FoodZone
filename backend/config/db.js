import mongoose from "mongoose"

export const connectdb= async ()=>{
    await mongoose.connect("mongodb+srv://divvijayaprakash:1692971@cluster0.b3oczah.mongodb.net/foodzone")
    .then(()=>console.log("db connected"));

}
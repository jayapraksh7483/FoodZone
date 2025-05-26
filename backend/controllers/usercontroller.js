import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";

import validator from "validator";
 
import 'dotenv/config'


const bcrypt = require("bcryptjs");
// login user
const loginuser = async (req, res) => {
  // Login logic here\
  const {password,email}=req.body;


 try {

     const user=await usermodel.findOne({email});
    if(!user)
    {
        return res.json({success:false,message:"user doesn't exist"})

    }
    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
    }

    const token=createToken(user._id);
    res.json({success:true,token})
   }
   catch(error)
   {
    console.log(error)
    res.json({success:false,message:"error"})

   }
};


const createToken=(id)=>
    {
        return jwt.sign({id},process.env.JWT_SECRET)
    }
// register user
const registeruser = async (req, res) => {
    // Registration logic here
    const {name,password,email}=req.body;
  
    try{


        if (!email || typeof email !== 'string') {
            return res.status(400).json({ success: false, message: "Email is required and must be a string" });
          }
          
      const exists =await usermodel.findOne({email});
      if(exists){
            return res.json({success:false,message:"user already exists"})
  
      }
      //validating email format & strong password
      if(!validator.isEmail(email))
          {
             return res.json({success:false,message:"please enter a valid email"})
          }
  
      if(password.length<8)
          {
              return res.json({success:false,message:"please enter a strong password "})
          }
  
  
          //hasing user password
          const salt =await bcrypt.genSalt(10)
          const hashedpassword=await bcrypt.hash(password,salt);
  
          const newuser= new usermodel({
              name:name,
              email:email,
              password:hashedpassword
          })
  
          const user=await newuser.save();
          const token =createToken(user._id)
          res.json({success:true,token})
    }
    catch(error){
      console.log(error)
      res.json({success:false,message:"error"})
      
  
  
    }
};
  
export { loginuser, registeruser };

import express from 'express'
import { addtocart,removefromcart,getcart } from '../controllers/cartcontroller.js'
import authmiddleware from '../middleware/auth.js';
const cartRouter=express.Router();


cartRouter.post("/add", authmiddleware,addtocart);
cartRouter.post("/remove", authmiddleware,removefromcart)
cartRouter.post("/get", authmiddleware,getcart)

export default cartRouter
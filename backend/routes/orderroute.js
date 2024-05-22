import express from "express";
import authmiddleware from '../middleware/auth.js';

import { listorders, placeorder, updatestatus, userOrders, verifyorder } from "../controllers/order.controller.js";

const orderRouter=express.Router();

orderRouter.post('/place',authmiddleware,placeorder);
orderRouter.post('/verify',verifyorder);
orderRouter.post('/userorders',authmiddleware,userOrders);
orderRouter.get('/list',listorders);
orderRouter.post('/status',updatestatus);

export default orderRouter
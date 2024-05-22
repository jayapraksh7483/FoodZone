 
import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from "stripe";

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order from frontend

 
const placeorder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new ordermodel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await usermodel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*80// Stripe expects the amount in the smallest currency unit (e.g., paise for INR)
            },
            quantity:item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2*100 // Adjust if 2 INR is intended
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "error" });
    }
};
const verifyorder= async (req,res)=>{
    const {orderId,success}=req.body
    try{
        if(success==="true")
            {
                await ordermodel.findByIdAndUpdate(orderId,{payment:true})
                res.json({success:true,message:"Paid"})
            }

            else{
                await ordermodel.findByIdAndDelete(orderId)
                res.json({success:false,messsage:"Not Paid"})
            }
    }
    catch (error){
        console.log(error);
            res.json({success:false,message:"error"})
        }
    
    
}

const userOrders =async(req,res)=>{
    try {
        const orders=await ordermodel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}

 // listing orders for admin panel
const listorders =async (req,res)=>{
    try{
        const orders=await ordermodel.find({});
        res.json({success:true,data:orders})

    }catch(error)
    {
        console.log(error);
        res.josn({success:false,message:"error"});
    }

}

const updatestatus=async(req,res)=>{

    try{
        await ordermodel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status update"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error"})

    }

}








export{placeorder,verifyorder,userOrders,listorders,updatestatus};
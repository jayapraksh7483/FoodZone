 import usermodel from "../models/usermodel.js"

//add items to user cart
const addtocart = async (req, res) => {
  try {
      const userData = await usermodel.findById(req.body.userId);
      if (!userData) {
          return res.json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData;
      if (!cartData[req.body.itemId]) {
          cartData[req.body.itemId] = 1;
      } else {
          cartData[req.body.itemId] += 1;
      }

      await usermodel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({success:true, message: "Added to cart" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "error" });
  }
}



 // remove item from user cart
 const removefromcart = async(req,res)=>{
   
  try{ 
    let userData=await usermodel.findById(req.body.userId);
    let cartData=await userData.cartData
    if(cartData[req.body.itemId]>0)
      {
        cartData[req.body.itemId]-=1
      }
      await usermodel.findByIdAndUpdate(req.body.userId,{cartData});
      res.json({success:"true",message:"removed from cart"})

  }
  catch(error){
    console.log(error)
    res.json({success:false,message:"error"})

  }
 }

 //fetch user cart data
 const getcart=async(req,res)=>{
  try{ 
    let userData=await usermodel.findById(req.body.userId);
    let cartData=await userData.cartData
     
       
      res.json({success:"true",cartData})

  }
  catch(error){
    console.log(error)
    res.json({success:false,message:"error"})

  }

 };


 export {addtocart,removefromcart,getcart};
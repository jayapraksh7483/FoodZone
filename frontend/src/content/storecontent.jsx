import React, { createContext ,useEffect,useState} from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    

   const [cartitems,setcartitems]=useState({});
   const url="http://localhost:4000";

   const[token,settoken]=useState("");
    const [food_list,setfoodlist]=useState([])
   const addtocart= async(itemId)=>{
      if(!cartitems[itemId])
         {
            setcartitems((prev)=>({...prev,[itemId]:1}))
         }

         else{
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
         }
         
          
         if (token) {
            try {
                const response = await axios.post(url + "/api/cart/add", { itemId }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Item added to cart on the server.', response.data);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
   }

   const removefromcart= async(itemId)=>{
      setcartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))


      if (token) {
         try {
             const response = await axios.post(url + "/api/cart/remove", { itemId }, {
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
             });
             console.log('Item added to cart on the server.', response.data);
         } catch (error) {
             console.error('Error adding item to cart:', error);
         }
     }

       

   }

    
   const gettotalamount=()=>{
      let totalamount=0;
      for(const item in cartitems)

       {
         if(cartitems[item]>0)
            {
               let iteminfo=food_list.find((product)=>product._id===item);
               totalamount+=iteminfo.price*cartitems[item];

            }

 

         }
         return totalamount;
   }
   const fetchfoodlist=async()=>{
      const response=await axios.get(url+"/api/food/list")
      setfoodlist(response.data.data)
   }

   const loadcartdata=async(token)=>{
      const response=await axios.post(url+"/api/cart/get",{},{headers:{ Authorization: `Bearer ${token}`}});
      setcartitems(response.data.cartData)
   }
    
   
    useEffect(() => {
      async function loadData() {
        await fetchfoodlist();
  
        if (localStorage.getItem("token")) {
          settoken(localStorage.getItem("token"));
          await loadcartdata(localStorage.getItem("token"));
         
         
        }
      }
      loadData();
    }, []);
   const contextValue = {
      food_list,
      cartitems,
      setcartitems,
      addtocart,
      removefromcart,
      gettotalamount,
      url,
      token,
      settoken

   }

       

   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   );
};

export default StoreContextProvider;
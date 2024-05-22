import React, { useContext ,useEffect} from 'react'
import './verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../content/storecontent';
import axios from 'axios';
const Verify = () => {
    const [searchParms ,setSearchParams]=useSearchParams();
    const success=searchParms.get("success")
    const orderId =searchParms.get("orderId")
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();


    const verifypayment = async () => {
        try {
          const response = await axios.post(url+"/api/orders/verify", { success, orderId });
          console.log("API Response:", response.data); // Log the API response
    
          if (response.data.success) {
            navigate("/myorders");
          } else {
            console.error("Verification failed:", response.data.message); // Log the error message
            alert(`Payment verification failed: ${response.data.message}`); // Optionally alert the user
            navigate("/");
          }
        } catch (error) {
          console.error("Payment verification failed:", error); // Log the error
          alert("An error occurred while verifying payment. Please try again."); // Optionally alert the user
          navigate("/"); // Optionally navigate to an error page or handle the error
        }
      };
    
      useEffect(() => {
        verifypayment();
      }, []);
 
     
  return (
    <div className='verify'>
        <div className="spinner">
            

        </div>
        
      
    </div>
  )
}


export default Verify

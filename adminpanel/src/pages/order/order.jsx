import React from 'react';
import './order.css';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/orders/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };
  
  const statushandler = async (event, orderId) => {
   const response=await axios.post(url+"/api/orders/status",{
    orderId,
    status:event.target.value
   })
   if(response.data.success)
    {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="order add">
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                    
                    if(index===order.items.length-1)
                      {
                        return item.name+"x"+item.quantity
                      }
                      else
                      {
                        return item.name+"x"+item.quantity+" "
                      }
             })}
              </p>
              <p className="order-item-name">
                {order.address.firstName+""+order.address.lastName}
              </p>

              <div className="order-item-address">
                {order.address.street+","}
                {order.address.city+"," +   order.address.state+","  +   order.address.country+","  +   order.address.zipcode+","}
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
             
                
            
            </div>
            <p>Items:{order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statushandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;

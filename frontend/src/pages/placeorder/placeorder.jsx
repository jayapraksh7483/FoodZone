import React, { useContext, useEffect, useState } from 'react';
import './placeorder.css';
import { StoreContext } from '../../content/storecontent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { gettotalamount, token, food_list, cartitems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onchangehandler = (event) => {
    const  name = event.target.name;
    const  value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];
      food_list.map((item) => {
        if (cartitems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartitems[item._id];
          orderItems.push(itemInfo);
        }
      });
      console.log(orderItems)

      let orderData = {
        // Ensure userId is available in context or passed as a prop
        address: data,
        items: orderItems,
        amount: gettotalamount() + 2
      };

      console.log('Order Data:', orderData); // Log order data for debugging

      let response = await axios.post(
        url+"/api/orders/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Response:', response.data); // Log response data for debugging

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Error placing order: ${error.message}`);
    }
  };
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token)
      {
         navigate('/cart')
      }

      else if(gettotalamount()===0)
        {
          navigate('/cart')
        }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      {/* Form fields */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input  required type="text" name="firstName" onChange={onchangehandler} value={data.firstName} placeholder="First Name" />
          <input  required  type="text" name="lastName" onChange={onchangehandler} value={data.lastName} placeholder="Last Name" />
        </div>
        <input   required  name="email" onChange={onchangehandler} value={data.email} type="email" placeholder="Email address" />
        <input    required  name="street" onChange={onchangehandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input   required  name="city" onChange={onchangehandler} value={data.city} type="text" placeholder="City" />
          <input  required  name="state" onChange={onchangehandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input   required   name="zipcode" onChange={onchangehandler} value={data.zipcode} type="text" placeholder="Zipcode" />
          <input  required  name="country" onChange={onchangehandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input  required   name="phone" onChange={onchangehandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal </p>
            <p>${gettotalamount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${gettotalamount() + 2}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;

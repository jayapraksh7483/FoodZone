import React, { useContext, useEffect, useState } from 'react';
import './loginpopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../content/storecontent';
import axios from 'axios';

const Loginpopup = ({ setshowlogin }) => {
  const { url, settoken } = useContext(StoreContext);

  const [currstate, setcurrstate] = useState("login");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchangehandler = (event) => {
    const { name, value } = event.target;
    setdata(prevData => ({ ...prevData, [name]: value }));
  };

  const onlogin = async (event) => {
    event.preventDefault();
    let newurl = url;
    if (currstate === "login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }
    try {
      const response = await axios.post(newurl, data);
      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setshowlogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='login-popup'>
      <form onSubmit={onlogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currstate === "login" ? "Login" : "Sign Up"}</h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="close" />
        </div>

        <div className="login-popup-inputs">
          {currstate === "signup" && (
            <input 
              onChange={onchangehandler} 
              name="name" 
              type="text" 
              placeholder='Your name' 
              value={data.name}  
              required 
            />
          )}
          <input 
            onChange={onchangehandler} 
            name="email"  
            value={data.email} 
            type="email"  
            placeholder='Your email' 
            required 
          />
          <input 
            onChange={onchangehandler} 
            name="password"  
            value={data.password} 
            type="password" 
            placeholder='Password' 
            required 
          />
        </div>
        <button type='submit'>
          {currstate === "signup" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currstate === "login" ? (
          <p>
            Create a new account? 
            <span onClick={() => setcurrstate("signup")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? 
            <span onClick={() => setcurrstate("login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;

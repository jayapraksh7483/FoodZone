import React, { useContext, useState } from 'react';
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../content/storecontent';

const Navbar = ({ setshowlogin }) => {
  const [menu, setMenu] = useState("home");
  const { gettotalamount, token, settoken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/"><h1 style={{color:"tomato"}}><b>FoodZone</b></h1></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobileapp")} className={menu === "mobileapp" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contactus")} className={menu === "contactus" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <input   style={{borderRadius:"10px", height:"40px", background:"red"}}  type="text" />
        <a href='#explore-menu'><img src={assets.search_icon} alt=""/></a> 
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={gettotalamount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => { setshowlogin(true) }}>Sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => { navigate("/myorders") }}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;

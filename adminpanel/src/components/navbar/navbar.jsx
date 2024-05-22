import React from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <h1 style={{color:"tomato"}} className='logo'><b>Food Zone</b></h1>
        <img src={assets.jp} alt="" className="profile" />
      
    </div>
  )
}

export default Navbar

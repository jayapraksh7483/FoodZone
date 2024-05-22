import React from 'react'
import'./footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                 <h1 style={{color:"orange"}}><b>Food Zone</b></h1>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repellat exercitationem aliquam delectus, molestias inventore vel, magni nesciunt voluptatum fugiat cumque autem minus ipsa quaerat voluptates impedit? Necessitatibus, dolores eum.</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon } alt="" />
                    
                    

                 </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li> Delivery</li>
                    <li>Privacy policy</li>
                </ul>
                 

                    
                </div>

                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                  <ul>
                    <li>+1-212-4332-4352</li>
                    <li>contact@foodzone.com</li>
                  </ul>
                </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 @FoodZone.com-All Right Reserved.
        </p>

      
    </div>
  )
}

export default Footer

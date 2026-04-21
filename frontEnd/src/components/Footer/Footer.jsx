import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          {/* <img src={assets.logo1} alt="" style={{height:'70px', width:'70px'}}/> */}
          <h1 style={{color:"orange"}}>Deliciouz</h1>
          <p>At [Deliciouz], we’re committed to delivering delicious, high-quality meals straight to your door — fresh, fast, and hassle-free. Whether you're craving comfort food, exploring new cuisines, or looking for healthy options, we've partnered with the best local restaurants to bring you a wide variety of dishes to satisfy every taste. With secure payments, real-time tracking, and 24/7 support, your next great meal is just a few clicks away.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt=""  />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>1234567891</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025:- All Right Reserved.
      </p>
    </div>
  )
}

export default Footer
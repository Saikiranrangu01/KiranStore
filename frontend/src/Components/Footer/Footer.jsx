import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import github from '../../assets/github.png'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">

            <div className="footer-content-left">
                <img src={assets.logo} alt="" className='logo'/>
                <p>Your satisfaction is not just a goal—it’s our guarantee.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <a href="https://github.com/Saikiranrangu01" target="_blank"><img src={github} alt="" /></a>
                    <a href = "https://www.linkedin.com/in/saikiran-rangu/" target="_blank"><img src={assets.linkedin_icon} alt="" /></a>
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 7569092145</li>
                    <li>saikirangoudrangu8@gmail.com</li>
                    
                </ul>
                <a href = ""></a>
                
            </div>

        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2025 © Kiran_Store. All rights reserved.
        </p>
    </div>
  )
}

export default Footer
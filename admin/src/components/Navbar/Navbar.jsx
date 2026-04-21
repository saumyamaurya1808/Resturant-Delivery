import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo1' src={assets.logo1}alt="" style={{height:"100px", width:"100px"}} />
        <img className='profile' src={assets.profile_image} alt="" style={{height:"80px", width:"80px",borderRadius:"50%"}}/>
    </div>
  )
}

export default Navbar
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {
  const[menu, setMenu] = useState("home");
  const{getTotalCartAmount,token,logout} = useContext(StoreContext);

  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <img src={assets.logo1} alt="" className='logo' style={{height:'100px', width:'100px'}} />
      <ul className='navbar-menu' >
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home" ? "active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu" ? "active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app" ? "active":""}>Mobile app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us" ? "active":""}>Contact us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search1} alt="" className='search'style={{height:'50px', width:'100px'}}/>
       
        <div className='navbar-cart'>
           <Link to='/cart'><img src={assets.cart1} alt="" className='dot' style={{height:'40px', width:'50px'}} />
           </Link>
           <div className={getTotalCartAmount()===0 ?" ":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon}alt="" style={{height:'40px', width:'50px', borderRadius:"50%"}} />
          <ul className='nav-profile-dropdown'>
            <li><Link to='/myorders'><img src={assets.bag_icon} alt="" style={{height:'20px', width:'20px'}} /><p>Orders</p></Link> </li>
            <hr />
            <li onClick={() => { logout(); navigate("/") }}><img src={assets.logout_icon} alt="" style={{height:'25px', width:'25px'}} /><p>Logout</p></li>
            
          </ul>
          </div>}
       
      </div>
    </div>
  )
}

export default Navbar
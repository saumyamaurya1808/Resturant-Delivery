// import React from 'react'
// import './Sidebar.css'
// import { assets } from '../../assets/assets'
// import { NavLink } from 'react-router-dom'
// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//         <div className="sidebar-options">
//             <NavLink to='/add' className="sidebar-option">
//                 <img src={assets.add_icon_white} alt="" />
//                 <p>Add Items</p>

//             </NavLink>
//             <NavLink to='/list' className="sidebar-option">
//                 <img src={assets.cart1} alt="" />
//                 <p>List Items</p>
                
//             </NavLink>
//             <NavLink to='/orders' className="sidebar-option">
//                 <img src={assets.cart1} alt="" />
//                 <p>Order Items</p>
                
//             </NavLink>
//         </div>
//     </div>
//   )
// }

// export default Sidebar



// chatgpt
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <NavLink 
          to='/add' 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.add_icon_white} alt="add" />
          <p>Add Items</p>
        </NavLink>

        <NavLink 
          to='/list' 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.cart1} alt="list" />
          <p>List Items</p>
        </NavLink>

        <NavLink 
          to='/orders' 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.cart1} alt="orders" />
          <p>Order Items</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
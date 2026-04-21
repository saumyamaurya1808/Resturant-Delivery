import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Orders from './pages/Orders/Orders'
import Verify from './pages/PlaceOrder/Verify'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUP/LoginPopUp'
const App = () => {
  const[showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}

       <div className='app' >
      <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/myorders' element={<Orders/>}/>
      <Route path='/verify' element={<Verify/>}/>

    </Routes>
    
    </div>
    <Footer/>
    </>
   
  )
}

export default App

import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useState } from 'react'
import axios from 'axios'


const PlaceOrder = () => {

  const {getTotalCartAmount,token, food_list,cartItems,url} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })
  
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    if (!token) {
      alert("Please login to place order");
      return;
    }
    if (getTotalCartAmount() === 0) {
      alert("Your cart is empty");
      return;
    }
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipCode', 'country', 'phone'];
    for (let field of requiredFields) {
      if (!data[field]) {
        alert(`Please fill in ${field}`);
        return;
      }
    }
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log(orderItems);
    
    let orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      address: data
    }

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {headers: {token}})
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.log(error);
      alert("Error placing order");
    }
  }

  

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' required/>
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name' required/>
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required/>
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required/>

        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code' required/>
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required/>
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required/>
      </div>

      
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0? 0:2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total </b>

              <b>${getTotalCartAmount()===0? 0: getTotalCartAmount() +2}</b>
            </div>
            
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
        
      </div>
      
    </form>
  )
}

export default PlaceOrder
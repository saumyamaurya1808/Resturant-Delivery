// import React, { useContext } from 'react'
// import './Cart.css'
// import { StoreContext } from '../../Context/StoreContext'
// import { useNavigate } from 'react-router-dom';


// const Cart = () => {
//   const{cartItems,food_list, removeFromCart,getTotalCartAmount,url }= useContext(StoreContext);

//   const navigate = useNavigate();

//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {/* {food_list.map((item, index)=>{
//           if(cartItems[item._id]>0)
//           {
//             return(
//               <div>
//                 <div className='cart-items-title cart-items-item'>
//                   <img src={url+"/images/" +item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>${item.price*cartItems[item._id]}</p>
//                   <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>

//                 </div>

//               <hr />
//               </div>
              

//             )
//           }

//         })} */}
//          {food_list.map((item, index)=>{
//           const qty = (cartItems?.[item._id] || 0); // <-- safe access
//           if(qty > 0)
//           {
//             return(
//               <div key={item._id}>
//                 <div className='cart-items-title cart-items-item'>
//                   <img src={url+"/images/" +item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{qty}</p>
//                   <p>${item.price * qty}</p>
//                   <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
//                 </div>
//               <hr />
//               </div>
//             )
//           }
//           return null;
//         })}

//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-detail">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detail">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount()===0? 0:2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detail">
//               <b>Total </b>

//               <b>${getTotalCartAmount()===0? 0: getTotalCartAmount() +2}</b>
//             </div>
            
//           </div>
//           <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If you have a promo code, Enter it here</p>
//             <div className='cart-promocode-input'>
//               <input type="text" placeholder='promo code' />
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default Cart
// chatgpt

import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate()

  // ✅ total amount ek baar calculate karo
  const totalAmount = getTotalCartAmount()

  return (
    <div className='cart'>

      {/* ================= CART ITEMS ================= */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {/* ✅ Empty Cart Message */}
        {food_list?.every(item => !cartItems?.[item._id]) && (
          <p className="empty-cart">Your cart is empty</p>
        )}

        {/* ✅ Items List */}
        {food_list?.map((item) => {
          const qty = cartItems?.[item._id] || 0

          if (qty > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  
                  <img 
                    src={item.image ? `${url}/images/${item.image}` : ""} 
                    alt={item.name} 
                  />

                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{qty}</p>
                  <p>${item.price * qty}</p>

                  <p 
                    onClick={() => removeFromCart(item._id)} 
                    className='cross'
                  >
                    x
                  </p>

                </div>
                <hr />
              </div>
            )
          }

          return null
        })}
      </div>

      {/* ================= CART BOTTOM ================= */}
      <div className="cart-bottom">

        {/* ✅ CART TOTAL */}
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>

            <hr />

            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${totalAmount === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-detail">
              <b>Total</b>
              <b>${totalAmount === 0 ? 0 : totalAmount + 2}</b>
            </div>
          </div>

          <button onClick={() => navigate('/order')}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* ✅ PROMO CODE */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>

            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart
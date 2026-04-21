import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems = {}, addToCart, removeFromCart, url } = useContext(StoreContext) || {}

  const quantity = cartItems?.[id] || 0

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name || 'food'} />
        {!quantity ? (
          <button className="add-btn" onClick={() => addToCart(id)} aria-label="Add item">
            Add
          </button>
        ) : (
          <div className="food-item-counter">
            <button className="dec-btn" onClick={() => removeFromCart(id)} aria-label="Decrease quantity">
              <img src={assets.remove_icon_red} alt="Remove" />
            </button>
            <p>{quantity}</p>
            <button className="inc-btn" onClick={() => addToCart(id)} aria-label="Increase quantity">
              <img src={assets.add_icon_green} alt="Add" />
            </button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        {/* <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div> */}
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default Fooditem


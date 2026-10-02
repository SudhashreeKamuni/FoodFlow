
import {useContext} from 'react'

import {CartContext} from '../../context/CartContext'

import './index.css'

const FoodItems = ({foodItems}) => {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  const getItemQuantity = id => {
    const cartItem = cartItems.find(item => item.id === id)

    if (cartItem) {
      return cartItem.quantity
    }

    return 0
  }

  return (
    <div className="food-items-container">
      <ul className="food-items-list">
        {foodItems.map(item => {
          const quantity = getItemQuantity(item.id)

          return (
            <li className="food-item" key={item.id}>
              <img
                src={item.image_url}
                alt={item.name}
                className="food-item-image"
              />

              <div className="food-item-details">
                <h2>{item.name}</h2>

                <p>₹{item.cost}</p>

                <p>⭐ {item.rating}</p>

                {quantity === 0 ? (
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                  >
                    ADD
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FoodItems


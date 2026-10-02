import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import CartEmpty from '../CartEmpty'

import {CartContext} from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const navigate = useNavigate()

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext)

  const getItemPrice = item => {
    return Number(item.cost) || 0
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const itemTotal = cartItems.reduce(
    (total, item) =>
      total + getItemPrice(item) * item.quantity,
    0,
  )

  const deliveryFee = cartItems.length > 0 ? 40 : 0

  const grandTotal = itemTotal + deliveryFee

  return (
    <div className="cart-page">

      <Header />

      <main className="cart-main">

        {cartItems.length === 0 ? (

          <CartEmpty />

        ) : (

          <div className="cart-container">

            <div className="cart-heading-row">

              <h1>Your Cart</h1>

              <button
                type="button"
                className="clear-cart-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>

            </div>

            <div className="cart-content">

              <div className="cart-list">

                {cartItems.map(item => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <div className="cart-item-details">

                      <h2>{item.name}</h2>

                      <p className="cart-item-price">
                        ₹{getItemPrice(item).toFixed(2)}
                      </p>

                      <div className="quantity-controls">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                    <p className="item-total">
                      ₹
                      {(
                        getItemPrice(item) *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>

                ))}

              </div>

              <div className="cart-summary">

                <h2>Order Summary</h2>

                <div className="summary-row">

                  <span>Items</span>

                  <span>{totalItems}</span>

                </div>

                <div className="summary-row">

                  <span>Item Total</span>

                  <span>
                    ₹{itemTotal.toFixed(2)}
                  </span>

                </div>

                <div className="summary-row">

                  <span>Delivery Fee</span>

                  <span>
                    ₹{deliveryFee.toFixed(2)}
                  </span>

                </div>

                <div className="summary-divider" />

                <div className="summary-row grand-total">

                  <span>Total</span>

                  <strong>
                    ₹{grandTotal.toFixed(2)}
                  </strong>

                </div>

                <button
                  type="button"
                  className="checkout-button"
                  onClick={() => navigate('/checkout')}
                >
                  Checkout
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

      <Footer />

    </div>
  )
}

export default Cart
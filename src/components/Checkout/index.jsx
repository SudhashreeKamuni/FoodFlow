import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import {CartContext} from '../../context/CartContext'

import './index.css'

const Checkout = () => {
  const navigate = useNavigate()

  const {cartItems, clearCart} = useContext(CartContext)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')

  const getItemPrice = item => {
    return Number(item.cost) || 0
  }

  const itemTotal = cartItems.reduce(
    (total, item) =>
      total + getItemPrice(item) * item.quantity,
    0,
  )

  const deliveryFee = cartItems.length > 0 ? 40 : 0

  const grandTotal = itemTotal + deliveryFee

  const onPlaceOrder = event => {
    event.preventDefault()

    if (cartItems.length === 0) {
      navigate('/cart')
      return
    }

    clearCart()

    navigate('/order-success')
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Header />

        <main className="checkout-empty">
          <h1>Your cart is empty</h1>

          <button
            type="button"
            onClick={() => navigate('/')}
          >
            Browse Restaurants
          </button>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="checkout-page">

      <Header />

      <main className="checkout-main">

        <div className="checkout-container">

          <h1>Checkout</h1>

          <div className="checkout-content">

            <form
              className="checkout-form"
              onSubmit={onPlaceOrder}
            >

              <h2>Delivery Details</h2>

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={event =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                required
              />

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={event =>
                  setPhone(event.target.value)
                }
                placeholder="Enter your phone number"
                required
              />

              <label htmlFor="address">
                Address
              </label>

              <textarea
                id="address"
                value={address}
                onChange={event =>
                  setAddress(event.target.value)
                }
                placeholder="Enter your delivery address"
                rows="4"
                required
              />

              <label htmlFor="city">
                City
              </label>

              <input
                id="city"
                type="text"
                value={city}
                onChange={event =>
                  setCity(event.target.value)
                }
                placeholder="Enter your city"
                required
              />

              <label htmlFor="pincode">
                Pincode
              </label>

              <input
                id="pincode"
                type="text"
                value={pincode}
                onChange={event =>
                  setPincode(event.target.value)
                }
                placeholder="Enter pincode"
                required
              />

              <button
                type="submit"
                className="place-order-button"
              >
                Place Order
              </button>

            </form>

            <div className="checkout-summary">

              <h2>Order Summary</h2>

              {cartItems.map(item => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div>
                    <p>{item.name}</p>
                    <span>
                      {item.quantity} × ₹
                      {getItemPrice(item).toFixed(2)}
                    </span>
                  </div>

                  <strong>
                    ₹
                    {(
                      getItemPrice(item) *
                      item.quantity
                    ).toFixed(2)}
                  </strong>

                </div>

              ))}

              <div className="checkout-divider" />

              <div className="checkout-total-row">
                <span>Item Total</span>
                <span>₹{itemTotal.toFixed(2)}</span>
              </div>

              <div className="checkout-total-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>

              <div className="checkout-divider" />

              <div className="checkout-total-row grand-total">
                <strong>Total</strong>
                <strong>₹{grandTotal.toFixed(2)}</strong>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  )
}

export default Checkout
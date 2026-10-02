import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import {CartContext} from '../../context/CartContext'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const {cartItems} = useContext(CartContext)

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <header className="header">

      <div className="header-content">

        <Link to="/" className="website-logo-link">
          <img
            src="/logo.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <nav className="nav-links">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/cart" className="nav-link">
            Cart ({totalCartItems})
          </Link>

          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>

        </nav>

      </div>

    </header>
  )
}

export default Header
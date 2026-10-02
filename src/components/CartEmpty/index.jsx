import {useNavigate} from 'react-router-dom'

import './index.css'

const CartEmpty = () => {
  const navigate = useNavigate()

  const onClickOrderFood = () => {
    navigate('/')
  }

  return (
    <div className="cart-empty">

      <div className="cart-empty-content">

        <h1>Your Cart Is Empty</h1>

        <p>
          Add some delicious food to your cart and
          enjoy your meal.
        </p>

        <button
          type="button"
          onClick={onClickOrderFood}
        >
          Order Food
        </button>

      </div>

    </div>
  )
}

export default CartEmpty
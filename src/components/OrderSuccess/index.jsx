// const OrderSuccess = ()=> {
//     <h1>Successfully placed the Order!!</h1>
// }
// export default OrderSuccess




import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const OrderSuccess = () => {
  const navigate = useNavigate()

  const onClickGoHome = () => {
    navigate('/')
  }

  return (
    <div className="order-success-page">

      <Header />

      <main className="order-success-container">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for ordering with FoodFlow.
          </p>

          <p className="delivery-message">
            Your order is being prepared and will be
            delivered soon.
          </p>

          <div className="order-info">

            <p>
              <strong>Order Status:</strong> Confirmed
            </p>

            <p>
              <strong>Estimated Delivery:</strong> 30–40 minutes
            </p>

          </div>

          <button
            type="button"
            className="go-home-button"
            onClick={onClickGoHome}
          >
            Back to Home
          </button>

        </div>

      </main>

      <Footer />

    </div>
  )
}

export default OrderSuccess

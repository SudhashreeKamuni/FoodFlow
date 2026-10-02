// import {Routes, Route} from 'react-router-dom'

// import LoginForm from './components/LoginForm'
// import Cart from './components/Cart'
// import RestaurantDetails from './components/RestaurantDetails'
// import Home from './components/Home'
// import NotFound from './components/NotFound'

// import './App.css'

// const App = () => {
//   return (
//     <>
//       <h1>CHECK 1</h1>

//       <h1>CHECK 2</h1>
//     </>
//   )
// }

// export default App

// <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/restaurantDetails" element={<RestaurantDetails />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/notfound" element={<NotFound />} />
//       </Routes>




import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Cart from './components/Cart'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import OrderSuccess from './components/OrderSuccess'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails  from './components/RestaurantDetails'
import Checkout from './components/Checkout'

const App = () => {
  return (
    <>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route
          path="/restaurant/:id"
          element={
            <ProtectedRoute>
              <RestaurantDetails  />
            </ProtectedRoute>
          }
          
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App


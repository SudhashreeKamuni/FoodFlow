// import {useEffect, useState} from 'react'
// import {useParams} from 'react-router-dom'
// import Cookie from 'js-cookie'

// import Header from '../Header'
// import Footer from '../Footer'
// import SomethingWentWrong from '../SomethingWentWrong'

// import './index.css'

// const RestaurantDetails  = () => {
//   const {id} = useParams()

//   const [restaurantDetails, setRestaurantDetails] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [hasError, setHasError] = useState(false)

//   const getRestaurantDetails = async () => {
//     const jwtToken = Cookie.get('jwt_token')

//     try {
//       const response = await fetch(
//         `https://apis.ccbp.in/restaurants-list/${id}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         },
//       )

//       if (!response.ok) {
//         throw new Error('Failed to fetch restaurant details')
//       }

//       const data = await response.json()

//       console.log('Restaurant Details:', data)

//       setRestaurantDetails(data)
//     } catch (error) {
//       console.log('RESTAURANT DETAILS ERROR:', error)
//       setHasError(true)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     getRestaurantDetails()
//   }, [id])

//   const renderLoadingView = () => (
//     <div className="restaurant-details-loader">
//       <p>Loading...</p>
//     </div>
//   )

//   const renderFailureView = () => <SomethingWentWrong />

//   const renderRestaurantDetails = () => {
//     if (!restaurantDetails) {
//       return null
//     }

//     const {
//       name,
//       image_url,
//       cuisine,
//       location,
//       user_rating,
//       items,
//     } = restaurantDetails

//     return (
//       <>
//         <div className="restaurant-details-header">
//           <img
//             src={image_url}
//             alt={name}
//             className="restaurant-details-image"
//           />

//           <div className="restaurant-details-info">
//             <h1>{name}</h1>
//             <p>{cuisine}</p>
//             <p>{location}</p>

//             <div className="restaurant-rating">
//               <p>
//                 ⭐ {user_rating?.rating}
//               </p>
//               <p>
//                 {user_rating?.reviews} Reviews
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="restaurant-menu">
//           <h2>Menu</h2>

//           <ul className="food-items-list">
//             {items?.map(item => (
//               <li key={item.id} className="food-item">
//                 <img
//                   src={item.image_url}
//                   alt={item.name}
//                   className="food-item-image"
//                 />

//                 <div className="food-item-details">
//                   <h3>{item.name}</h3>

//                   <p>
//                     ₹ {item.cost}
//                   </p>

//                   <p>
//                     ⭐ {item.rating}
//                   </p>

//                   <button type="button">
//                     ADD
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </>
//     )
//   }

//   return (
//     <>
//       <Header />

//       <main className="restaurant-details-container">
//         {isLoading
//           ? renderLoadingView()
//           : hasError
//           ? renderFailureView()
//           : renderRestaurantDetails()}
//       </main>

//       <Footer />
//     </>
//   )
// }

// export default RestaurantDetails






import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookie from 'js-cookie'
import RestaurantHeaders from '../RestaurantsHeader'
import FoodItems from '../FoodItems'

const RestaurantDetails = () => {
  const {id} = useParams()

  const [restaurant, setRestaurant] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getRestaurantDetails = async () => {
      const jwtToken = Cookie.get('jwt_token')

      try {
        const url = `https://apis.ccbp.in/restaurants-list/${id}`

        console.log('Restaurant details URL:', url)

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        console.log('Restaurant details status:', response.status)

        if (!response.ok) {
          throw new Error('Failed to fetch restaurant details')
        }

        const data = await response.json()

        console.log('Restaurant details response:', data)

        setRestaurant(data)
      } catch (error) {
        console.log('RESTAURANT DETAILS ERROR:', error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getRestaurantDetails()
  }, [id])

  if (isLoading) {
    return <h1>Loading restaurant...</h1>
  }

  if (hasError) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div>
    <RestaurantHeaders restaurant={restaurant} />
    <FoodItems foodItems = {restaurant.food_items} />
  </div>
  )
}

export default RestaurantDetails
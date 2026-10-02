import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookie from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

const Home = () => {
  const [offers, setOffers] = useState([])
  const [restaurants, setRestaurants] = useState([])

  const [activeOffer, setActiveOffer] = useState(0)

  const [isOffersLoading, setIsOffersLoading] = useState(true)
  const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true)

  const [offersError, setOffersError] = useState(false)
  const [restaurantsError, setRestaurantsError] = useState(false)

  const jwtToken = Cookie.get('jwt_token')

  const navigate = useNavigate()

  const onRestaurantClick = id => {
    navigate(`/restaurant/${id}`)
  }

  // Fetch offers
  useEffect(() => {
    const getOffers = async () => {
      try {
        const response = await fetch(
          'https://apis.ccbp.in/restaurants-list/offers',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch offers')
        }

        const data = await response.json()

        console.log('Offers:', data)

        setOffers(data.offers)
        setActiveOffer(0)
      } catch (error) {
        console.log('OFFERS ERROR:', error)
        setOffersError(true)
      } finally {
        setIsOffersLoading(false)
      }
    }

    getOffers()
  }, [jwtToken])

  // Fetch restaurants
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const url =
          'https://apis.ccbp.in/restaurants-list?offset=0&limit=9'

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        console.log('========== HOME RESTAURANTS DEBUG ==========')
        console.log('URL:', url)
        console.log('STATUS:', response.status)

        const responseText = await response.text()

        console.log('API RESPONSE:', responseText)

        if (!response.ok) {
          throw new Error(
            `Restaurants API failed: ${response.status}`,
          )
        }

        const data = JSON.parse(responseText)

        console.log('RESTAURANTS DATA:', data)

        setRestaurants(data.restaurants)
      } catch (error) {
        console.log('RESTAURANTS ERROR:', error)
        setRestaurantsError(true)
      } finally {
        setIsRestaurantsLoading(false)
      }
    }

    getRestaurants()
  }, [jwtToken])

  // Previous offer
  const onPreviousOffer = () => {
    setActiveOffer(previousIndex => {
      if (previousIndex === 0) {
        return offers.length - 1
      }

      return previousIndex - 1
    })
  }

  // Next offer
  const onNextOffer = () => {
    setActiveOffer(previousIndex => {
      if (previousIndex === offers.length - 1) {
        return 0
      }

      return previousIndex + 1
    })
  }

  // Select offer using dots
  const onSelectOffer = index => {
    setActiveOffer(index)
  }

  return (
    <div className="home-page">
      <Header />

      <main>
        {/* OFFERS */}
        <section className="offers-section">
          <div className="home-container">

            <h1>Discover Delicious Food</h1>

            {isOffersLoading && (
              <p>Loading offers...</p>
            )}

            {offersError && <SomethingWentWrong />}

            {!isOffersLoading &&
              !offersError &&
              offers.length > 0 && (
                <div className="offers-carousel">

                  {/* Previous button */}
                  <button
                    type="button"
                    className="carousel-button carousel-left"
                    onClick={onPreviousOffer}
                    aria-label="Previous offer"
                  >
                    ‹
                  </button>

                  {/* Current offer */}
                  <div className="carousel-image-container">
                    <img
                      src={offers[activeOffer].image_url}
                      alt="Special offer"
                      className="carousel-image"
                    />
                  </div>

                  {/* Next button */}
                  <button
                    type="button"
                    className="carousel-button carousel-right"
                    onClick={onNextOffer}
                    aria-label="Next offer"
                  >
                    ›
                  </button>

                  {/* Dots */}
                  <div className="carousel-dots">
                    {offers.map((offer, index) => (
                      <button
                        type="button"
                        key={offer.id}
                        className={`carousel-dot ${
                          index === activeOffer ? 'active' : ''
                        }`}
                        onClick={() => onSelectOffer(index)}
                        aria-label={`Go to offer ${index + 1}`}
                      />
                    ))}
                  </div>

                </div>
              )}
          </div>
        </section>

        {/* RESTAURANTS */}
        <section className="restaurants-section">
          <div className="home-container">

            <div className="restaurants-heading">
              <h2>Popular Restaurants</h2>

              <p>
                Explore restaurants and discover your
                favourite food.
              </p>
            </div>

            {isRestaurantsLoading && (
              <p>Loading restaurants...</p>
            )}

            {restaurantsError && (
              <SomethingWentWrong />
            )}

            {!isRestaurantsLoading &&
              !restaurantsError &&
              restaurants.length > 0 && (
                <div className="restaurant-grid">

                  {restaurants.map(restaurant => (
                    <div
                      className="restaurant-card"
                      key={restaurant.id}
                      onClick={() =>
                        onRestaurantClick(restaurant.id)
                      }
                    >
                      <img
                        src={restaurant.image_url}
                        alt={restaurant.name}
                      />

                      <div className="restaurant-content">

                        <h3>{restaurant.name}</h3>

                        <p>{restaurant.cuisine}</p>

                        <p>
                          ⭐ {restaurant.user_rating.rating}
                        </p>

                        <p>
                          {restaurant.cost_for_two}
                        </p>

                      </div>
                    </div>
                  ))}

                </div>
              )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
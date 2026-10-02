import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookie from 'js-cookie'

import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

const AllRestaurants = () => {
  const navigate = useNavigate()

  const [restaurants, setRestaurants] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [sortBy, setSortBy] = useState('Highest')
  const [activePage, setActivePage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const limit = 9

  const getRestaurants = async () => {
    setIsLoading(true)
    setHasError(false)

    const jwtToken = Cookie.get('jwt_token')

    const offset = (activePage - 1) * limit

    let url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`

    if (searchInput.trim() !== '') {
      url += `&search=${encodeURIComponent(
        searchInput.trim(),
      )}`
    }

    if (sortBy !== '') {
      url += `&sort_by_rating=${sortBy}`
    }

    console.log('========== ALL RESTAURANTS DEBUG ==========')
    console.log('URL:', url)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

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

      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRestaurants()
  }, [activePage, sortBy])

  const onSearchChange = event => {
    setSearchInput(event.target.value)
  }

  const onSearch = () => {
    setActivePage(1)

    getRestaurants()
  }

  const onSortChange = event => {
    setSortBy(event.target.value)
    setActivePage(1)
  }

  
  const onRestaurantClick = id => {
  console.log('🔥 RESTAURANT CLICKED:', id)
  navigate(`/restaurant/${id}`)
}
  // const onRestaurantClick = id => {
  //   navigate(`/restaurant/${id}`)
  // }

  const onPreviousPage = () => {
    if (activePage > 1) {
      setActivePage(previousPage => previousPage - 1)
    }
  }

  const onNextPage = () => {
    if (restaurants.length === limit) {
      setActivePage(previousPage => previousPage + 1)
    }
  }

  return (
    <section className="all-restaurants">
      <div className="restaurants-container">
        <div className="restaurants-top">
          <div>
            <h2>Popular Restaurants</h2>

            <p>
              Explore restaurants and discover your
              favourite food.
            </p>
          </div>

          <div className="restaurant-controls">
            <input
              type="search"
              value={searchInput}
              placeholder="Search restaurants"
              onChange={onSearchChange}
            />

            <button
              type="button"
              onClick={onSearch}
            >
              Search
            </button>

            <select
              value={sortBy}
              onChange={onSortChange}
            >
              <option value="Highest">
                Highest Rating
              </option>

              <option value="Lowest">
                Lowest Rating
              </option>
            </select>
          </div>
        </div>

        {isLoading && (
          <p className="status-message">
            Loading restaurants...
          </p>
        )}

        {hasError && <SomethingWentWrong />}

        {!isLoading &&
          !hasError &&
          restaurants.length === 0 && (
            <p className="status-message">
              No restaurants found.
            </p>
          )}

        {!isLoading &&
          !hasError &&
          restaurants.length > 0 && (
            <>
              <div className="restaurant-grid">
                {restaurants.map(restaurant => (
                  <button
                    type="button"
                    className="restaurant-card"
                    key={restaurant.id}
                    onClick={() =>
                      onRestaurantClick(
                        restaurant.id,
                      )
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
                        ⭐{' '}
                        {restaurant.user_rating.rating}
                      </p>

                      <p>
                        {restaurant.cost_for_two}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pagination">
                <button
                  type="button"
                  onClick={onPreviousPage}
                  disabled={activePage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {activePage}
                </span>

                <button
                  type="button"
                  onClick={onNextPage}
                  disabled={
                    restaurants.length < limit
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}
      </div>
    </section>
  )
}

export default AllRestaurants
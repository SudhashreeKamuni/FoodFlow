import './index.css'

const RestaurantHeaders = ({restaurant}) => {
  return (
    <section className="restaurant-header">
      <div className="restaurant-header-container">
        <div className="restaurant-image-container">
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="restaurant-header-image"
          />
        </div>

        <div className="restaurant-header-content">
          <h1>{restaurant.name}</h1>

          <p className="restaurant-cuisine">
            {restaurant.cuisine}
          </p>

          <p className="restaurant-location">
            📍 {restaurant.location}
          </p>

          <div className="restaurant-info">
            <div className="restaurant-info-item">
              <span className="restaurant-info-value">
                ⭐ {restaurant.rating}
              </span>

              <span className="restaurant-info-label">
                Rating
              </span>
            </div>

            <div className="restaurant-info-item">
              <span className="restaurant-info-value">
                {restaurant.reviews_count}
              </span>

              <span className="restaurant-info-label">
                Reviews
              </span>
            </div>

            <div className="restaurant-info-item">
              <span className="restaurant-info-value">
                ₹{restaurant.cost_for_two}
              </span>

              <span className="restaurant-info-label">
                Cost for two
              </span>
            </div>
          </div>

          <p className="restaurant-timing">
            Opens at {restaurant.opens_at}
          </p>
        </div>
      </div>
    </section>
  )
}

export default RestaurantHeaders
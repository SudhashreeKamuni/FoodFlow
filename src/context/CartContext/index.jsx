import {createContext, useEffect, useState} from 'react'

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
})

const CartContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartData')

    if (storedCart) {
      return JSON.parse(storedCart)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      'cartData',
      JSON.stringify(cartItems),
    )
  }, [cartItems])

  const addToCart = foodItem => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(
        item => item.id === foodItem.id,
      )

      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === foodItem.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        )
      }

      return [
        ...prevCartItems,
        {
          ...foodItem,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = foodItemId => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.id !== foodItemId),
    )
  }

  const increaseQuantity = foodItemId => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === foodItemId
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    )
  }

  const decreaseQuantity = foodItemId => {
    setCartItems(prevCartItems =>
      prevCartItems
        .map(item =>
          item.id === foodItemId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
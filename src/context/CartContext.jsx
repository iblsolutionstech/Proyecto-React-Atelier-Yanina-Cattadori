import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const CartContext = createContext(undefined)

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) return

    setCart((currentCart) => {
      const itemInCart = currentCart.find((cartItem) => cartItem.id === item.id)

      if (itemInCart) {
        return currentCart.map((cartItem) => (
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.min(cartItem.stock, cartItem.quantity + quantity) }
            : cartItem
        ))
      }

      return [...currentCart, { ...item, quantity: Math.min(item.stock, quantity) }]
    })
  }

  const removeItem = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId))
  }

  const clear = () => {
    setCart([])
  }

  const isInCart = (itemId) => cart.some((item) => item.id === itemId)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const value = useMemo(() => ({
    cart,
    addItem,
    removeItem,
    clear,
    isInCart,
    totalItems,
    totalPrice,
  }), [cart, totalItems, totalPrice])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart debe utilizarse dentro de CartProvider')
  }

  return context
}

export { CartContext, CartProvider, useCart }

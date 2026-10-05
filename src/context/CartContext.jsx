import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { addCartItem, getCartTotalItems, getCartTotalPrice, removeCartItem } from './cartUtils.js'

const CartContext = createContext(undefined)

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) return

    setCart((currentCart) => addCartItem(currentCart, item, quantity))
  }

  const removeItem = (itemId) => {
    setCart((currentCart) => removeCartItem(currentCart, itemId))
  }

  const clear = () => {
    setCart([])
  }

  const isInCart = (itemId) => cart.some((item) => item.id === itemId)
  const totalItems = getCartTotalItems(cart)
  const totalPrice = getCartTotalPrice(cart)

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

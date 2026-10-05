export function addCartItem(cart, item, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) return cart

  const itemInCart = cart.find((cartItem) => cartItem.id === item.id)

  if (itemInCart) {
    return cart.map((cartItem) => (
      cartItem.id === item.id
        ? { ...cartItem, quantity: Math.min(cartItem.stock, cartItem.quantity + quantity) }
        : cartItem
    ))
  }

  return [...cart, { ...item, quantity: Math.min(item.stock, quantity) }]
}

export function removeCartItem(cart, itemId) {
  return cart.filter((item) => item.id !== itemId)
}

export function getCartTotalItems(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0)
}

export function getCartTotalPrice(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}

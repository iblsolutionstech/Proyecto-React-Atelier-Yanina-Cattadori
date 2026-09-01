function CartWidget() {
  return (
    <div className="cart-widget" aria-label="Carrito de compras con 3 productos">
      <span className="cart-icon" aria-hidden="true">
        🛒
      </span>
      <span className="cart-count">3</span>
    </div>
  )
}

export default CartWidget

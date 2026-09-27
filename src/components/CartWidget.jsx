import { Link } from 'react-router-dom'

function CartWidget() {
  return (
    <Link className="cart-widget" to="/checkout" aria-label="Ir al checkout con 3 productos">
      <span className="cart-icon" aria-hidden="true">
        🛒
      </span>
      <span className="cart-count">3</span>
    </Link>
  )
}

export default CartWidget

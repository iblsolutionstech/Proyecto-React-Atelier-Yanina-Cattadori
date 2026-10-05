import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function CartWidget() {
  const { totalItems } = useCart()

  return (
    <Link className="cart-widget" to="/cart" aria-label={`Ir al carrito con ${totalItems} productos`}>
      <span className="cart-icon" aria-hidden="true">
        🛒
      </span>
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
    </Link>
  )
}

export default CartWidget

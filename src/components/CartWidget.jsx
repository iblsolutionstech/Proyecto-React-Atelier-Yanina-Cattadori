import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

function CartWidget() {
  const { totalItems } = useCart()

  return (
    <Link className="cart-widget" to="/cart" aria-label={`Ir al carrito con ${totalItems} productos`}>
      <ShoppingBag aria-hidden="true" size={19} strokeWidth={1.8} />
      <span className="cart-widget-label">Bolsa</span>
      {totalItems > 0 && <span className="cart-count" key={totalItems}>{totalItems}</span>}
    </Link>
  )
}

export default CartWidget

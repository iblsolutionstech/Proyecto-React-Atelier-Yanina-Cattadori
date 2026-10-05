import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function Cart() {
  const { cart, clear, removeItem, totalItems, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <p className="eyebrow">Tu seleccion</p>
          <h1>Tu carrito esta esperando una pieza con historia.</h1>
          <p>Explora el catalogo para sumar arreglos, prendas recuperadas y accesorios textiles.</p>
          <Link className="primary-action cart-empty-action" to="/">Ver catalogo</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <section className="cart-content">
        <div className="cart-heading">
          <div>
            <p className="eyebrow">Tu seleccion</p>
            <h1>Carrito</h1>
          </div>
          <p>{totalItems} {totalItems === 1 ? 'pieza seleccionada' : 'piezas seleccionadas'}</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items" aria-label="Productos seleccionados">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <h2>{item.name}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <button type="button" className="cart-remove" onClick={() => removeItem(item.id)}>
                    Quitar del carrito
                  </button>
                </div>
                <div className="cart-item-prices">
                  <span>{currencyFormatter.format(item.price)} c/u</span>
                  <strong>{currencyFormatter.format(item.price * item.quantity)}</strong>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Resumen de compra</h2>
            <div className="cart-summary-row">
              <span>Productos</span>
              <strong>{totalItems}</strong>
            </div>
            <div className="cart-total">
              <span>Total</span>
              <strong>{currencyFormatter.format(totalPrice)}</strong>
            </div>
            <Link className="cart-checkout" to="/checkout">Finalizar compra</Link>
            <button type="button" className="cart-clear" onClick={clear}>Vaciar carrito</button>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default Cart

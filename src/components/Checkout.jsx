import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { createOrder } from '../services/ordersService.js'
import { validateBuyer } from '../utils/validateBuyer.js'

const initialBuyer = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
}

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function Checkout() {
  const { user } = useAuth()
  const { cart, totalItems, totalPrice, clear } = useCart()
  const [buyer, setBuyer] = useState(initialBuyer)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderId, setOrderId] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setBuyer((currentBuyer) => ({
      ...currentBuyer,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!user) {
      setError('Necesitás iniciar sesión para finalizar la compra.')
      return
    }

    if (cart.length === 0) {
      setError('Tu carrito está vacío.')
      return
    }

    const { buyer: validatedBuyer, error: buyerError } = validateBuyer(buyer)

    if (buyerError) {
      setError(buyerError)
      return
    }

    setIsSubmitting(true)

    try {
      const order = await createOrder({
        user,
        buyer: validatedBuyer,
        cart,
        total: totalPrice,
      })

      setOrderId(order.id)
      clear()
    } catch {
      setError('No se pudo registrar la compra. Intentá nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderId) {
    return (
      <main className="checkout-page">
        <section className="checkout-confirmation">
          <h1>Gracias por elegir el atelier</h1>
          <p>Tu pedido fue registrado correctamente.</p>
          <p className="order-reference">
            ID de orden: <strong>{orderId}</strong>
          </p>
          <Link className="primary-action" to="/">
            Volver al catalogo
          </Link>
        </section>
      </main>
    )
  }

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <main className="checkout-page">
      <section className="checkout-content">
        <div className="checkout-heading">
          <h1>Datos de entrega</h1>
          <p>Completá la información para registrar tu pedido.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="fullName">Nombre y apellido</label>
            <input
              id="fullName"
              name="fullName"
              value={buyer.fullName}
              onChange={handleChange}
              autoComplete="name"
              maxLength="100"
              required
            />

            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={buyer.phone}
              onChange={handleChange}
              autoComplete="tel"
              maxLength="30"
              required
            />

            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              name="address"
              value={buyer.address}
              onChange={handleChange}
              autoComplete="street-address"
              maxLength="150"
              required
            />

            <label htmlFor="city">Ciudad</label>
            <input
              id="city"
              name="city"
              value={buyer.city}
              onChange={handleChange}
              autoComplete="address-level2"
              maxLength="80"
              required
            />

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando compra...' : 'Confirmar compra'}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Resumen</h2>
            <p>{totalItems} productos seleccionados</p>
            <strong>{currencyFormatter.format(totalPrice)}</strong>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default Checkout

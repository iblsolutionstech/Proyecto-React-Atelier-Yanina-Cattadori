import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
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
  const { user, isLoading } = useAuth()
  const { cart, totalItems, totalPrice, clear } = useCart()
  const location = useLocation()
  const [buyer, setBuyer] = useState(initialBuyer)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

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

      setCompletedOrder(order)
      clear()
    } catch {
      setError('No se pudo registrar la compra. Intentá nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (completedOrder) {
    return (
      <main className="checkout-page">
        <section className="checkout-confirmation">
          <h1>Gracias por elegir el atelier</h1>
          <p>Tu pedido fue registrado correctamente.</p>
          <p className="order-reference">
            Número de pedido: <strong>{completedOrder.number}</strong>
          </p>
          <p className="order-reference">
            Código de confirmación: <strong>{completedOrder.id}</strong>
          </p>
          <Link className="primary-action" to="/">
            Volver al catalogo
          </Link>
        </section>
      </main>
    )
  }

  if (isLoading) {
    return <p className="auth-status" role="status">Verificando sesión...</p>
  }

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />
  }

  if (!user) {
    return (
      <main className="checkout-page">
        <section className="checkout-confirmation">
          <h1>Ingresá para continuar con tu compra</h1>
          <p>Tu carrito está listo. Iniciá sesión o creá una cuenta para completar el pedido.</p>
          <Link className="primary-action" to="/login" state={{ from: location }}>
            Ingresar
          </Link>
          <p className="auth-switch">
            ¿Todavía no tenés cuenta?{' '}
            <Link to="/registro" state={{ from: location }}>Registrarme</Link>
          </p>
        </section>
      </main>
    )
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

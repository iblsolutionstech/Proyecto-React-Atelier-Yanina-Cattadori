import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartWidget from './CartWidget.jsx'
import { categories } from '../constants/categories.js'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { user, logout } = useAuth()
  const [logoutError, setLogoutError] = useState('')

  async function handleLogout() {
    setLogoutError('')

    try {
      await logout()
    } catch {
      setLogoutError('No se pudo cerrar la sesión. Intentá nuevamente.')
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-content">
        <NavLink className="brand" to="/" aria-label="Ir al inicio de YaninaCattadori">
          <img className="brand-logo" src="/brand/yanina-cattadori-logo.jpeg" alt="" />
          <span className="brand-copy">
            <span className="brand-signature">Yanina</span>
            <span className="brand-surname">Cattadori</span>
            <span className="brand-caption">Atelier circular</span>
          </span>
        </NavLink>

        <nav className="category-nav" aria-label="Categorias de productos">
          {categories.map((category) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'category-link category-link-active' : 'category-link')}
              to={`/category/${category.id}`}
              key={category.id}
            >
              {category.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {user ? (
            <div className="account-session">
              <span className="account-email" title={user.email}>{user.email}</span>
              <button className="account-action" type="button" onClick={handleLogout}>
                Salir
              </button>
            </div>
          ) : (
            <NavLink className="account-action" to="/login">Ingresar</NavLink>
          )}
          <CartWidget />
        </div>
        {logoutError && <p className="nav-error" role="alert">{logoutError}</p>}
      </div>
    </header>
  )
}

export default Navbar

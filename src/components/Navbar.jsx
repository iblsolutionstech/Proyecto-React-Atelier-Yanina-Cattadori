import { NavLink } from 'react-router-dom'
import CartWidget from './CartWidget.jsx'
import { categories } from '../mock/asyncMock.js'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <NavLink className="brand" to="/" aria-label="Ir al inicio de YaninaCattadori">
          <span className="brand-signature">Yanina</span>
          <span className="brand-surname">Cattadori</span>
          <span className="brand-caption">Atelier circular</span>
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

        <CartWidget />
      </div>
    </header>
  )
}

export default Navbar

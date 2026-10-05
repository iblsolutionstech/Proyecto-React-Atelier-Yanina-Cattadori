import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import EmptyFrame from './EmptyFrame.jsx'
import Item from './Item.jsx'
import { FRAME_SEQUENCE } from './frameSequence.js'

function HomeWall({ items, isLoading }) {
  return (
    <section className="wall" aria-labelledby="wall-title">
      <div className="wall-title">
        <h1 id="wall-title">Reparar tambien es una forma de disenar.</h1>
      </div>

      <aside className="wall-plaque hang" aria-label="Sobre el atelier">
        <div className="plaque-body">
          <p className="hero-brand">Yanina Cattadori</p>
          <p className="plaque-lead">Un atelier para prendas que merecen seguir en movimiento.</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/category/arreglos">Ver arreglos <ArrowUpRight aria-hidden="true" size={17} /></Link>
            <Link className="secondary-action" to="/category/transformaciones">Explorar transformaciones</Link>
          </div>
          <div className="faja faja-thin" aria-hidden="true" />
          <p className="hero-note">Moda circular · Arreglos · Transformaciones</p>
          <p className="wall-count" role="status">
            {isLoading ? 'Cargando catalogo...' : `${items.length} servicios y piezas disponibles`}
          </p>
        </div>
      </aside>

      {isLoading
        ? FRAME_SEQUENCE.map(({ slot, tilt }, index) => (
          <div
            key={slot}
            className={`hang wall-placeholder slot-${slot}${index === 2 ? ' slot-c-first' : ''}`}
            style={{ '--tilt': `${tilt}deg` }}
          >
            <EmptyFrame />
          </div>
        ))
        : items.map((product, index) => (
          <Item key={product.id} product={product} index={index} layout="wall" />
        ))}
    </section>
  )
}

HomeWall.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default HomeWall

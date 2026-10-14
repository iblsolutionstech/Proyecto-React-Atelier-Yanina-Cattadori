import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function HomeHero() {
  return (
    <section className="home-hero">
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="hero-brand">Yanina Cattadori</p>
        <h1>Reparar tambien es una forma de disenar.</h1>
        <p>
          Un atelier para prendas que merecen seguir en movimiento.
        </p>
        <div className="hero-actions">
          <Link className="primary-action" to="/category/arreglos">Ver arreglos <ArrowUpRight aria-hidden="true" size={17} /></Link>
          <Link className="secondary-action" to="/category/transformaciones">Explorar transformaciones</Link>
        </div>
      </div>
      <p className="hero-note">Moda circular · Arreglos · Transformaciones</p>
    </section>
  )
}

export default HomeHero

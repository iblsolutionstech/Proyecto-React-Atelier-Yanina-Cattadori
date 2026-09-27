import { Link } from 'react-router-dom'

function HomeHero() {
  return (
    <section className="home-hero">
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">Atelier Yanina Cattadori</p>
        <h1>Reparar tambien es crear.</h1>
        <p>
          Arreglos, transformaciones y piezas textiles para elegir una moda con mas historia.
        </p>
        <div className="hero-actions">
          <Link className="primary-action" to="/category/arreglos">Ver arreglos</Link>
          <Link className="secondary-action" to="/category/transformaciones">Explorar transformaciones</Link>
        </div>
      </div>
    </section>
  )
}

export default HomeHero

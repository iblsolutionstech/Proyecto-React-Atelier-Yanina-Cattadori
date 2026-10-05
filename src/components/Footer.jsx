import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="faja" aria-hidden="true" />
      <div className="footer-content">
        <div>
          <p className="footer-brand"><span>Yanina</span><span className="brand-surname">Cattadori</span></p>
          <p>Atelier de moda circular, arreglos y diseno de indumentaria.</p>
        </div>
        <nav aria-label="Navegacion del pie de pagina">
          <Link to="/">Catalogo</Link>
          <Link to="/category/arreglos">Arreglos</Link>
          <Link to="/category/transformaciones">Transformaciones</Link>
        </nav>
      </div>
      <p className="footer-note">Cada prenda puede tener una nueva historia.</p>
    </footer>
  )
}

export default Footer

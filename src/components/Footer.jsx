import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div>
          <p className="footer-brand">YaninaCattadori</p>
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

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">Error 404</p>
      <h1>No encontramos esta pagina</h1>
      <p>La direccion que buscaste no esta disponible en el atelier.</p>
      <Link to="/">Ir al catalogo</Link>
    </main>
  )
}

export default NotFound

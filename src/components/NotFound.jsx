import { Link } from 'react-router-dom'
import EmptyFrame from './EmptyFrame.jsx'

function NotFound() {
  return (
    <main className="not-found">
      <EmptyFrame variant="fallen" />
      <h1>No encontramos esta pagina</h1>
      <p>La direccion que buscaste no esta disponible en el atelier.</p>
      <Link className="secondary-action" to="/">Ir al catalogo</Link>
    </main>
  )
}

export default NotFound

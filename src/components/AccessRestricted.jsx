import { Link, useLocation } from 'react-router-dom'

function AccessRestricted() {
  const location = useLocation()
  const requestedSection = location.state?.from === '/checkout' ? 'el checkout' : 'esta seccion'

  return (
    <main className="access-restricted">
      <p className="eyebrow">Acceso restringido</p>
      <h1>Para continuar hacia {requestedSection}, necesitás ingresar a tu cuenta.</h1>
      <p>Mientras tanto, podés seguir explorando las piezas y servicios del atelier.</p>
      <Link to="/">Volver al catalogo</Link>
    </main>
  )
}

export default AccessRestricted

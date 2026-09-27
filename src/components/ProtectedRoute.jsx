import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ isAllowed, children }) {
  const location = useLocation()

  if (isAllowed) {
    return children
  }

  return <Navigate to="/acceso-restringido" replace state={{ from: location.pathname }} />
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute

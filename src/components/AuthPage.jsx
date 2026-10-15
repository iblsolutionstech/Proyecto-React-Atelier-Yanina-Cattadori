import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function getAuthErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'Ya existe una cuenta con este correo.',
    'auth/invalid-email': 'Ingresá un correo electrónico válido.',
    'auth/invalid-credential': 'El correo o la contraseña no son correctos.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/network-request-failed': 'No hay conexión. Revisá tu red e intentá nuevamente.',
    'auth/too-many-requests': 'Hubo demasiados intentos. Esperá unos minutos e intentá de nuevo.',
  }

  return messages[error.code] || 'No se pudo completar la operación. Intentá nuevamente.'
}

function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { user, isLoading, login, register, resetPassword } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recoveryMode, setRecoveryMode] = useState(false)

  const destination = location.state?.from?.pathname || '/'
  const isRecovering = !isRegister && recoveryMode
  const title = isRecovering
    ? 'Recuperar contraseña'
    : isRegister
      ? 'Crear una cuenta'
      : 'Ingresar a tu cuenta'
  const description = isRecovering
    ? 'Ingresá el correo de tu cuenta y te enviaremos un enlace para crear una contraseña nueva.'
    : isRegister
      ? 'Registrate para continuar con tu compra.'
      : 'Ingresá para finalizar tu pedido.'
  const submitLabel = isSubmitting
    ? 'Procesando...'
    : isRecovering
      ? 'Enviar enlace'
      : isRegister
        ? 'Crear cuenta'
        : 'Ingresar'

  if (isLoading) {
    return <p className="auth-status">Verificando sesión...</p>
  }

  if (user) {
    return <Navigate to={destination} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim() || (!isRecovering && !password)) {
      setError(isRecovering ? 'Ingresá tu correo electrónico.' : 'Completá el correo y la contraseña.')
      return
    }

    setIsSubmitting(true)

    try {
      if (isRecovering) {
        await resetPassword(email.trim())
        setSuccess('Si el correo está registrado, vas a recibir un enlace para cambiar la contraseña.')
      } else if (isRegister) {
        await register(email.trim(), password)
        navigate(destination, { replace: true })
      } else {
        await login(email.trim(), password)
        navigate(destination, { replace: true })
      }
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <h1 id="auth-title">
          {title}
        </h1>
        <p>{description}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          {!isRecovering && (
            <>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                minLength="6"
                required
              />
            </>
          )}

          {error && <p className="auth-error" role="alert">{error}</p>}
          {success && <p className="auth-success" role="status">{success}</p>}

          <button type="submit" disabled={isSubmitting}>
            {submitLabel}
          </button>
        </form>

        {!isRegister && (
          <button
            className="auth-recovery"
            type="button"
            onClick={() => {
              setRecoveryMode((currentMode) => !currentMode)
              setPassword('')
              setError('')
              setSuccess('')
            }}
          >
            {isRecovering ? 'Volver a ingresar' : 'Olvidé mi contraseña'}
          </button>
        )}

        {!isRecovering && (
          <p className="auth-switch">
            {isRegister ? '¿Ya tenés cuenta?' : '¿Todavía no tenés cuenta?'}{' '}
            <Link to={isRegister ? '/login' : '/registro'} state={{ from: location.state?.from }}>
              {isRegister ? 'Ingresar' : 'Registrarme'}
            </Link>
          </p>
        )}
      </section>
    </main>
  )
}

AuthPage.propTypes = {
  mode: PropTypes.oneOf(['login', 'register']).isRequired,
}

export default AuthPage

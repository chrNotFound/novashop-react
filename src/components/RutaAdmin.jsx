import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function RutaAdmin({ children }) {
  const { estaAutenticado, esAdmin } = useAuth()

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />
  }

  if (!esAdmin) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3 mb-3">No tienes permiso para ver esta página</h1>
        <p className="text-muted">Esta sección es solo para administradores.</p>
        <Link className="btn btn-primary" to="/">
          Volver al inicio
        </Link>
      </section>
    )
  }

  return children
}

export default RutaAdmin
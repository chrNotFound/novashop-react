import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const ENLACES = [
  { ruta: '/admin', texto: 'Dashboard', exacto: true },
  { ruta: '/admin/ordenes', texto: 'Órdenes' },
  { ruta: '/admin/productos', texto: 'Productos' },
  { ruta: '/admin/categorias', texto: 'Categorías' },
  { ruta: '/admin/usuarios', texto: 'Usuarios' },
  { ruta: '/admin/reportes', texto: 'Reportes' },
  { ruta: '/admin/perfil', texto: 'Perfil' },
]

function AdminLayout() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const manejarCierre = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className="flex-grow-1 d-flex flex-column flex-md-row">
      <aside className="header-nova text-light p-3 admin-menu">
        <p className="fw-bold mb-1">NovaShop Admin</p>
        <p className="small text-secondary mb-3">{usuario.nombre} {usuario.apellidos}</p>

        <ul className="nav nav-pills flex-md-column gap-1 mb-3">
          {ENLACES.map((enlace) => (
            <li key={enlace.ruta} className="nav-item">
              <NavLink className="nav-link text-light" to={enlace.ruta} end={enlace.exacto}>
                {enlace.texto}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="d-grid gap-2">
          <Link className="btn btn-outline-light btn-sm" to="/">
            Ir a la tienda
          </Link>
          <button type="button" className="btn btn-danger btn-sm" onClick={manejarCierre}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <section className="flex-grow-1 p-4">
        <Outlet />
      </section>
    </div>
  )
}

export default AdminLayout
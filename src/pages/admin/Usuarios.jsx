import { useState } from 'react'
import { Link } from 'react-router-dom'
import { eliminarUsuario, obtenerUsuarios } from '../../data/usuarios.js'
import { useAuth } from '../../context/AuthContext.jsx'

function Usuarios() {
  const { usuario: sesion } = useAuth()
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios())

  const manejarEliminar = (usuario) => {
    if (window.confirm(`¿Eliminar a ${usuario.nombre} ${usuario.apellidos}?`)) {
      eliminarUsuario(usuario.id)
      setUsuarios(obtenerUsuarios())
    }
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Link className="btn btn-primary" to="/admin/usuarios/nuevo">
          Nuevo usuario
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre} {usuario.apellidos}</td>
                <td>{usuario.correo}</td>
                <td>
                  <span className={'badge ' + (usuario.rol === 'admin' ? 'text-bg-dark' : 'text-bg-secondary')}>
                    {usuario.rol}
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link className="btn btn-outline-primary btn-sm" to={`/admin/usuarios/${usuario.id}/editar`}>
                      Editar
                    </Link>
                    <Link className="btn btn-outline-secondary btn-sm" to={`/admin/usuarios/${usuario.id}/historial`}>
                      Historial
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      disabled={usuario.id === sesion.id}
                      onClick={() => manejarEliminar(usuario)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Usuarios
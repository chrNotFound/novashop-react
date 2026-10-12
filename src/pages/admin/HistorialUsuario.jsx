import { Link, useParams } from 'react-router-dom'
import { obtenerOrdenes } from '../../data/ordenes.js'
import { obtenerUsuarioPorId } from '../../data/usuarios.js'
import { formatearPrecio } from '../../utils/precios.js'
import { claseEstado } from '../../utils/estados.js'

function HistorialUsuario() {
  const { id } = useParams()
  const usuario = obtenerUsuarioPorId(id)

  if (!usuario) {
    return (
      <>
        <h1 className="h3 mb-3">Usuario no encontrado</h1>
        <Link className="btn btn-primary" to="/admin/usuarios">
          Volver a usuarios
        </Link>
      </>
    )
  }

  const ordenes = obtenerOrdenes().filter(
    (orden) => orden.cliente.correo.toLowerCase() === usuario.correo.toLowerCase()
  )
  const totalPagado = ordenes
    .filter((orden) => orden.estado === 'pagada' || orden.estado === 'enviada')
    .reduce((suma, orden) => suma + orden.total, 0)

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Historial de compras</h1>
        <Link className="btn btn-secondary" to="/admin/usuarios">
          Volver
        </Link>
      </div>

      <p className="mb-1">
        <strong>{usuario.nombre} {usuario.apellidos}</strong> · {usuario.correo}
      </p>
      <p className="text-muted">Total en compras pagadas: {formatearPrecio(totalPagado)}</p>

      {ordenes.length === 0 ? (
        <p className="text-muted">Este usuario todavía no tiene compras.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle bg-white">
            <thead>
              <tr>
                <th>Nro</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>#{orden.id}</td>
                  <td>{new Date(orden.fecha).toLocaleString('es-CL')}</td>
                  <td>{formatearPrecio(orden.total)}</td>
                  <td>
                    <span className={'badge ' + claseEstado(orden.estado)}>{orden.estado}</span>
                  </td>
                  <td>
                    <Link className="btn btn-outline-primary btn-sm" to={`/admin/ordenes/${orden.id}`}>
                      Ver boleta
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default HistorialUsuario
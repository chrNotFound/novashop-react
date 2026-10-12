import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerOrdenes } from '../../data/ordenes.js'
import { formatearPrecio } from '../../utils/precios.js'
import { ESTADOS, claseEstado } from '../../utils/estados.js'

function Ordenes() {
  const [ordenes] = useState(() => [...obtenerOrdenes()].reverse())
  const [filtro, setFiltro] = useState('todos')

  const visibles = filtro === 'todos' ? ordenes : ordenes.filter((orden) => orden.estado === filtro)

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Órdenes y boletas</h1>

        <select
          className="form-select w-auto"
          aria-label="Filtrar por estado"
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value)}
        >
          <option value="todos">Todos los estados</option>
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>

      {visibles.length === 0 ? (
        <p className="text-muted">No hay órdenes para mostrar.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle bg-white">
            <thead>
              <tr>
                <th>Nro</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((orden) => (
                <tr key={orden.id}>
                  <td>#{orden.id}</td>
                  <td>{new Date(orden.fecha).toLocaleString('es-CL')}</td>
                  <td>{orden.cliente.nombre} {orden.cliente.apellidos}</td>
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

export default Ordenes
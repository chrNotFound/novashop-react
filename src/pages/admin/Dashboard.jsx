import { Link } from 'react-router-dom'
import { obtenerOrdenes } from '../../data/ordenes.js'
import { obtenerProductos } from '../../data/productos.js'
import { obtenerUsuarios } from '../../data/usuarios.js'
import { esCritico } from '../../utils/stock.js'
import { formatearPrecio } from '../../utils/precios.js'

function Dashboard() {
  const ordenes = obtenerOrdenes()
  const productos = obtenerProductos()
  const usuarios = obtenerUsuarios()

  const ordenesPagadas = ordenes.filter((orden) => orden.estado === 'pagada')
  const ventasTotales = ordenesPagadas.reduce((suma, orden) => suma + orden.total, 0)
  const criticos = productos.filter(esCritico)

  const tarjetas = [
    { titulo: 'Compras pagadas', valor: ordenesPagadas.length, color: 'primary' },
    { titulo: 'Ventas totales', valor: formatearPrecio(ventasTotales), color: 'success' },
    { titulo: 'Productos', valor: productos.length, color: 'info' },
    { titulo: 'Usuarios', valor: usuarios.length, color: 'warning' },
  ]

  return (
    <>
      <h1 className="h3">Dashboard</h1>
      <p className="text-muted mb-4">Resumen de las actividades diarias.</p>

      <div className="row g-3 mb-4">
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.titulo} className="col-12 col-sm-6 col-xl-3">
            <div className={`card text-bg-${tarjeta.color} h-100`}>
              <div className="card-body">
                <p className="mb-1">{tarjeta.titulo}</p>
                <p className="fs-3 fw-bold mb-0">{tarjeta.valor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Productos con stock crítico</h2>
            <Link className="btn btn-outline-primary btn-sm" to="/admin/productos">
              Ver productos
            </Link>
          </div>

          {criticos.length === 0 ? (
            <p className="text-muted mb-0">No hay productos con stock crítico.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {criticos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>
                        <span className="badge text-bg-danger">{producto.stock}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
import { obtenerOrdenes } from '../../data/ordenes.js'
import { obtenerProductos } from '../../data/productos.js'
import { formatearPrecio } from '../../utils/precios.js'
import { ESTADOS, claseEstado } from '../../utils/estados.js'

const ESTADOS_CON_INGRESO = ['pagada', 'enviada']

function Reportes() {
  const ordenes = obtenerOrdenes()
  const productos = obtenerProductos()

  const ordenesConIngreso = ordenes.filter((orden) => ESTADOS_CON_INGRESO.includes(orden.estado))
  const ingresos = ordenesConIngreso.reduce((suma, orden) => suma + orden.total, 0)
  const ticketPromedio = ordenesConIngreso.length > 0 ? Math.round(ingresos / ordenesConIngreso.length) : 0
  const valorInventario = productos.reduce((suma, producto) => suma + producto.precio * producto.stock, 0)

  const porEstado = ESTADOS.map((estado) => {
    const delEstado = ordenes.filter((orden) => orden.estado === estado)
    return {
      estado,
      cantidad: delEstado.length,
      total: delEstado.reduce((suma, orden) => suma + orden.total, 0),
    }
  })

  const vendidos = {}
  const porCategoria = {}
  const categoriaPorId = Object.fromEntries(productos.map((producto) => [producto.id, producto.categoria]))

  ordenesConIngreso.forEach((orden) => {
    orden.items.forEach((item) => {
      const subtotal = item.precio * item.cantidad

      if (!vendidos[item.id]) {
        vendidos[item.id] = { nombre: item.nombre, unidades: 0, ingresos: 0 }
      }
      vendidos[item.id].unidades += item.cantidad
      vendidos[item.id].ingresos += subtotal

      const categoria = categoriaPorId[item.id] || 'Sin categoría'
      porCategoria[categoria] = (porCategoria[categoria] || 0) + subtotal
    })
  })

  const masVendidos = Object.values(vendidos)
    .sort((a, b) => b.unidades - a.unidades)
    .slice(0, 5)

  const ventasPorCategoria = Object.entries(porCategoria).sort((a, b) => b[1] - a[1])

  const tarjetas = [
    { titulo: 'Ingresos', valor: formatearPrecio(ingresos), color: 'success' },
    { titulo: 'Ticket promedio', valor: formatearPrecio(ticketPromedio), color: 'primary' },
    { titulo: 'Órdenes', valor: ordenes.length, color: 'info' },
    { titulo: 'Valor del inventario', valor: formatearPrecio(valorInventario), color: 'warning' },
  ]

  return (
    <>
      <h1 className="h3">Reportes</h1>
      <p className="text-muted mb-4">Los ingresos consideran las órdenes pagadas y enviadas.</p>

      <div className="row g-3 mb-4">
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.titulo} className="col-12 col-sm-6 col-xl-3">
            <div className={`card text-bg-${tarjeta.color} h-100`}>
              <div className="card-body">
                <p className="mb-1">{tarjeta.titulo}</p>
                <p className="fs-4 fw-bold mb-0">{tarjeta.valor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5">Órdenes por estado</h2>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Órdenes</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {porEstado.map((fila) => (
                      <tr key={fila.estado}>
                        <td>
                          <span className={'badge ' + claseEstado(fila.estado)}>{fila.estado}</span>
                        </td>
                        <td>{fila.cantidad}</td>
                        <td>{formatearPrecio(fila.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5">Productos más vendidos</h2>
              {masVendidos.length === 0 ? (
                <p className="text-muted mb-0">Todavía no hay ventas registradas.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Unidades</th>
                        <th>Ingresos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {masVendidos.map((producto) => (
                        <tr key={producto.nombre}>
                          <td>{producto.nombre}</td>
                          <td>{producto.unidades}</td>
                          <td>{formatearPrecio(producto.ingresos)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5">Ventas por categoría</h2>
              {ventasPorCategoria.length === 0 ? (
                <p className="text-muted mb-0">Todavía no hay ventas registradas.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Categoría</th>
                        <th>Ingresos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventasPorCategoria.map(([categoria, total]) => (
                        <tr key={categoria}>
                          <td>{categoria}</td>
                          <td>{formatearPrecio(total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reportes
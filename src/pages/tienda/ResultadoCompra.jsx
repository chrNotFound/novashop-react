import { Link, useParams } from 'react-router-dom'
import { obtenerOrdenPorId } from '../../data/ordenes.js'

function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

function ResultadoCompra({ exitoso }) {
  const { id } = useParams()
  const orden = obtenerOrdenPorId(id)

  if (!orden) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3 mb-3">Orden no encontrada</h1>
        <Link className="btn btn-primary" to="/productos">
          Volver a productos
        </Link>
      </section>
    )
  }

  const { cliente, direccion, items, total } = orden

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          {exitoso ? (
            <h1 className="h4 text-success">Se ha realizado la compra. Nro #{orden.id}</h1>
          ) : (
            <h1 className="h4 text-danger">No se pudo realizar el pago. Nro #{orden.id}</h1>
          )}
          <p className="text-muted">
            {new Date(orden.fecha).toLocaleString('es-CL')} · Estado: {orden.estado}
          </p>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <h2 className="h6">Cliente</h2>
              <p className="mb-0">{cliente.nombre} {cliente.apellidos}</p>
              <p className="mb-0">{cliente.correo}</p>
            </div>
            <div className="col-12 col-md-6">
              <h2 className="h6">Dirección de entrega</h2>
              <p className="mb-0">
                {direccion.calle}
                {direccion.departamento && `, Depto ${direccion.departamento}`}
              </p>
              <p className="mb-0">{direccion.comuna}, {direccion.region}</p>
              {direccion.indicaciones && <p className="mb-0">{direccion.indicaciones}</p>}
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{formatearPrecio(item.precio)}</td>
                    <td>{item.cantidad}</td>
                    <td>{formatearPrecio(item.precio * item.cantidad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="fs-5 fw-bold text-end">
            {exitoso ? 'Total pagado' : 'Total a pagar'}: {formatearPrecio(total)}
          </p>

          <div className="d-flex flex-wrap justify-content-end gap-2">
            {exitoso ? (
              <Link className="btn btn-primary" to="/productos">
                Seguir comprando
              </Link>
            ) : (
              <Link className="btn btn-success" to="/checkout">
                Volver a realizar el pago
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultadoCompra
import { Link } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext.jsx'

function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, total } = useCarrito()

  if (items.length === 0) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3 mb-3">Tu carrito está vacío</h1>
        <p className="text-muted">Agrega productos para verlos aquí.</p>
        <Link className="btn btn-primary" to="/productos">
          Ver productos
        </Link>
      </section>
    )
  }

  return (
    <section className="container py-4">
      <h1 className="h3 mb-4">Carrito de compras</h1>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                  />
                </td>
                <td>{item.nombre}</td>
                <td>{formatearPrecio(item.precio)}</td>
                <td>
                  <div className="btn-group btn-group-sm" role="group" aria-label="Cambiar cantidad">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                    >
                      -
                    </button>
                    <span className="btn btn-light disabled">{item.cantidad}</span>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{formatearPrecio(item.precio * item.cantidad)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => quitar(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4" className="text-end">Total</th>
              <th colSpan="2">{formatearPrecio(total)}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex flex-wrap justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={vaciar}>
          Limpiar
        </button>
        <Link className="btn btn-success" to="/checkout">
          Comprar ahora
        </Link>
      </div>
    </section>
  )
}

export default Carrito
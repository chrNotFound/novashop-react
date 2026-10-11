import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerProductoPorId } from '../../data/productos.js'
import { formatearPrecio, precioFinal } from '../../utils/precios.js'
import { useCarrito } from '../../context/CarritoContext.jsx'

function DetalleProducto() {
  const { id } = useParams()
  const producto = obtenerProductoPorId(id)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)
  const { agregar } = useCarrito()

  if (!producto) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3 mb-3">Producto no encontrado</h1>
        <Link className="btn btn-primary" to="/productos">
          Volver a productos
        </Link>
      </section>
    )
  }

  const sinStock = producto.stock === 0

  const disminuir = () => setCantidad((actual) => Math.max(1, actual - 1))
  const aumentar = () => setCantidad((actual) => Math.min(producto.stock, actual + 1))

  const manejarAgregar = () => {
    agregar(producto, cantidad)
    setAgregado(true)
  }

  return (
    <section className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/productos">Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-12 col-md-5">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded border bg-white p-3"
          />
        </div>

        <div className="col-12 col-md-7">
          <h1 className="h3">{producto.nombre}</h1>
          <p className="text-muted">{producto.atributo}</p>

          <p className="fs-3 fw-bold">
            {formatearPrecio(precioFinal(producto))}
            {producto.descuento > 0 && (
              <span className="fs-6 text-muted text-decoration-line-through ms-2">
                {formatearPrecio(producto.precio)}
              </span>
            )}
          </p>

          <p>{producto.descripcion}</p>

          {sinStock ? (
            <span className="badge text-bg-danger mb-3">Sin stock</span>
          ) : (
            <>
              <p className="text-success mb-3">Stock disponible: {producto.stock}</p>

              <div className="d-flex align-items-center gap-3 mb-3">
                <span>Cantidad:</span>
                <div className="btn-group" role="group" aria-label="Seleccionar cantidad">
                  <button type="button" className="btn btn-outline-secondary" onClick={disminuir}>
                    -
                  </button>
                  <span className="btn btn-light disabled">{cantidad}</span>
                  <button type="button" className="btn btn-outline-secondary" onClick={aumentar}>
                    +
                  </button>
                </div>
              </div>

              <button type="button" className="btn btn-primary" onClick={manejarAgregar}>
                Agregar al carrito
              </button>

              {agregado && (
                <div className="alert alert-success mt-3 py-2" role="alert">
                  Producto agregado al carrito.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default DetalleProducto
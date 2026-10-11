import { Link } from 'react-router-dom'
import { formatearPrecio, precioFinal } from '../utils/precios.js'

function ProductCard({ producto, onAgregar }) {
  const sinStock = producto.stock === 0
  const enOferta = producto.descuento > 0

  return (
    <div className="card h-100 shadow-sm position-relative">
      {enOferta && (
        <span className="badge text-bg-primary position-absolute top-0 end-0 m-2">
          -{producto.descuento}%
        </span>
      )}

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top p-3"
        style={{ height: '220px', objectFit: 'contain' }}
      />

      <div className="card-body d-flex flex-column">
        <h2 className="h6 card-title">{producto.nombre}</h2>
        <p className="text-muted small mb-2">{producto.atributo}</p>

        <p className="mb-1">
          <span className="fw-bold fs-5">{formatearPrecio(precioFinal(producto))}</span>
          {enOferta && (
            <span className="text-muted text-decoration-line-through ms-2">
              {formatearPrecio(producto.precio)}
            </span>
          )}
        </p>

        {sinStock ? (
          <span className="badge text-bg-danger align-self-start mb-3">Sin stock</span>
        ) : (
          <span className="badge text-bg-success align-self-start mb-3">
            Stock: {producto.stock}
          </span>
        )}

        <div className="mt-auto d-grid gap-2">
          <Link className="btn btn-outline-primary btn-sm" to={`/productos/${producto.id}`}>
            Ver detalle
          </Link>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={sinStock}
            onClick={() => onAgregar && onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
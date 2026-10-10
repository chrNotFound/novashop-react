import { Link } from 'react-router-dom'

function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

function ProductCard({ producto, onAgregar }) {
  const sinStock = producto.stock === 0

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top p-3"
        style={{ height: '220px', objectFit: 'contain' }}
      />

      <div className="card-body d-flex flex-column">
        <h2 className="h6 card-title">{producto.nombre}</h2>
        <p className="text-muted small mb-2">{producto.atributo}</p>
        <p className="fw-bold fs-5 mb-1">{formatearPrecio(producto.precio)}</p>

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
import { useState } from 'react'
import ProductCard from '../../components/ProductCard.jsx'
import { obtenerProductos } from '../../data/productos.js'
import { useCarrito } from '../../context/CarritoContext.jsx'

function Ofertas() {
  const [ofertas] = useState(() =>
    obtenerProductos().filter((producto) => producto.descuento > 0)
  )
  const { agregar } = useCarrito()

  return (
    <section className="container py-4">
      <h1 className="h3 mb-4">Ofertas</h1>

      {ofertas.length === 0 ? (
        <p className="text-muted">No hay productos en oferta por ahora.</p>
      ) : (
        <div className="row g-4">
          {ofertas.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <ProductCard producto={producto} onAgregar={(item) => agregar(item, 1)} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Ofertas
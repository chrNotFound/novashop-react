import { useState } from 'react'
import ProductCard from '../../components/ProductCard.jsx'
import { obtenerProductos } from '../../data/productos.js'

function Productos() {
  const [productos] = useState(() => obtenerProductos())
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <section className="container py-4">
      <h1 className="h3 mb-3">Productos</h1>

      <input
        type="search"
        className="form-control mb-4"
        placeholder="Buscar producto por nombre"
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      {productosFiltrados.length === 0 ? (
        <p className="text-muted">No se encontraron productos.</p>
      ) : (
        <div className="row g-4">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Productos
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard.jsx'
import { obtenerProductos } from '../../data/productos.js'
import { useCarrito } from '../../context/CarritoContext.jsx'

function Home() {
  const [destacados] = useState(() => obtenerProductos().slice(0, 4))
  const { agregar } = useCarrito()

  return (
    <>
      <img
        src="/Imagen/Principal.png"
        alt="Tecnología y accesorios gamer en NovaShop"
        className="img-fluid w-100"
      />

      <section className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Productos destacados</h1>
          <Link className="btn btn-outline-primary" to="/productos">
            Ver todos los productos
          </Link>
        </div>

        <div className="row g-4">
          {destacados.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard producto={producto} onAgregar={(item) => agregar(item, 1)} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
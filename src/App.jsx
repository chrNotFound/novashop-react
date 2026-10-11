import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/tienda/Home.jsx'
import Productos from './pages/tienda/Productos.jsx'
import DetalleProducto from './pages/tienda/DetalleProducto.jsx'
import Categorias from './pages/tienda/Categorias.jsx'
import Ofertas from './pages/tienda/Ofertas.jsx'
import Nosotros from './pages/tienda/Nosotros.jsx'
import Blog from './pages/tienda/Blog.jsx'
import DetalleBlog from './pages/tienda/DetalleBlog.jsx'
import Contacto from './pages/tienda/Contacto.jsx'
import Carrito from './pages/tienda/Carrito.jsx'
import Checkout from './pages/tienda/Checkout.jsx'
import ResultadoCompra from './pages/tienda/ResultadoCompra.jsx'
import Login from './pages/tienda/Login.jsx'
import Registro from './pages/tienda/Registro.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa/:id" element={<ResultadoCompra exitoso />} />
          <Route path="/compra-error/:id" element={<ResultadoCompra exitoso={false} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/tienda/Home.jsx'
import Productos from './pages/tienda/Productos.jsx'
import DetalleProducto from './pages/tienda/DetalleProducto.jsx'
import Carrito from './pages/tienda/Carrito.jsx'
import Checkout from './pages/tienda/Checkout.jsx'
import ResultadoCompra from './pages/tienda/ResultadoCompra.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa/:id" element={<ResultadoCompra exitoso />} />
          <Route path="/compra-error/:id" element={<ResultadoCompra exitoso={false} />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
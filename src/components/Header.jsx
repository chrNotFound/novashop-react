import { Link, NavLink } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.jsx'

function Header() {
  const { cantidadTotal } = useCarrito()

  return (
    <header className="header-nova shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <Link className="navbar-brand" to="/">
          <img className="logo-nova" src="/Imagen/NovaShopLogo.png" alt="NovaShop" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Mostrar u ocultar el menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
            </li>
          </ul>

          <div className="d-flex flex-wrap gap-2">
            <Link className="btn btn-outline-light btn-sm" to="/carrito">
              Carrito <span className="badge text-bg-primary">{cantidadTotal}</span>
            </Link>
            <Link className="btn btn-outline-primary btn-sm" to="/login">
              Iniciar sesión
            </Link>
            <Link className="btn btn-primary btn-sm" to="/registro">
              Crear cuenta
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
function Footer() {
  return (
    <footer className="footer-nova text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1 fw-bold">NovaShop</p>
        <small>© {new Date().getFullYear()} NovaShop. Todos los derechos reservados.</small>
      </div>
    </footer>
  )
}

export default Footer
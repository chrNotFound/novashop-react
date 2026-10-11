const SECCIONES = [
  {
    numero: '01',
    titulo: 'Misión',
    texto: 'Acercar tecnología de calidad a cualquier persona en Chile, con información clara y precios transparentes.',
  },
  {
    numero: '02',
    titulo: 'Visión',
    texto: 'Ser una tienda de referencia para quienes buscan mejorar su equipo de trabajo o estudio.',
  },
  {
    numero: '03',
    titulo: 'Valores',
    texto: 'Transparencia en precios y stock, atención honesta, y un catálogo curado en vez de saturado.',
  },
]

function Nosotros() {
  return (
    <section className="container py-4">
      <h1 className="h3 mb-3">Quiénes somos</h1>
      <p className="lead mb-4">
        NovaShop es una tienda online de tecnología y accesorios electrónicos, creada por
        estudiantes de Ingeniería en Informática. Nuestro objetivo es ofrecer una experiencia de
        compra simple, moderna y confiable, con productos útiles para el día a día.
      </p>

      <div className="row g-4">
        {SECCIONES.map((seccion) => (
          <div key={seccion.numero} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <p className="fw-bold text-primary mb-1">{seccion.numero}</p>
                <h2 className="h5">{seccion.titulo}</h2>
                <p className="mb-0">{seccion.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Nosotros
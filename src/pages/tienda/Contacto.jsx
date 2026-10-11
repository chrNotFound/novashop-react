import { useState } from 'react'
import { validarContacto } from '../../utils/validaciones.js'

const DATOS_INICIALES = { nombre: '', correo: '', comentario: '' }

function Contacto() {
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    setEnviado(false)
  }

  const clase = (campo) => 'form-control' + (errores[campo] ? ' is-invalid' : '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const erroresEncontrados = validarContacto(datos)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) {
      return
    }

    setDatos(DATOS_INICIALES)
    setEnviado(true)
  }

  return (
    <section className="container py-4">
      <h1 className="h3 mb-4">Contacto</h1>

      <div className="row g-4">
        <div className="col-12 col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 mb-3">Información de contacto</h2>
              <p className="mb-2"><strong>Correo:</strong> contacto@novashop.cl</p>
              <p className="mb-2"><strong>Teléfono:</strong> +56 9 1234 5678</p>
              <p className="mb-2"><strong>Ubicación:</strong> Av. Tecnología 456, Quilpué, Región de Valparaíso</p>
              <p className="mb-0"><strong>Horario:</strong> Lunes a viernes, 9:00 a 18:00 hrs</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 mb-3">Envíanos un mensaje</h2>

              {enviado && (
                <div className="alert alert-success py-2" role="alert">
                  Mensaje enviado. Te responderemos a la brevedad.
                </div>
              )}

              <form onSubmit={manejarEnvio} noValidate>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre completo</label>
                  <input id="nombre" name="nombre" className={clase('nombre')} value={datos.nombre} onChange={manejarCambio} />
                  <div className="invalid-feedback">{errores.nombre}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo (opcional)</label>
                  <input id="correo" name="correo" type="email" className={clase('correo')} value={datos.correo} onChange={manejarCambio} />
                  <div className="invalid-feedback">{errores.correo}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="comentario" className="form-label">Comentario</label>
                  <textarea id="comentario" name="comentario" rows="4" className={clase('comentario')} value={datos.comentario} onChange={manejarCambio} />
                  <div className="invalid-feedback">{errores.comentario}</div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
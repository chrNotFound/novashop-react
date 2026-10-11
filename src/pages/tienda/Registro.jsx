import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { validarRegistro } from '../../utils/validaciones.js'

const DATOS_INICIALES = {
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  confirmarClave: '',
}

function Registro() {
  const { registrar } = useAuth()
  const navigate = useNavigate()
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  const clase = (campo) => 'form-control' + (errores[campo] ? ' is-invalid' : '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const erroresEncontrados = validarRegistro(datos)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) {
      return
    }

    try {
      registrar(datos)
      navigate('/')
    } catch (error) {
      setErrores({ correo: error.message })
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-4">Crear cuenta</h1>

              <form onSubmit={manejarEnvio} noValidate>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      className={clase('nombre')}
                      value={datos.nombre}
                      onChange={manejarCambio}
                    />
                    <div className="invalid-feedback">{errores.nombre}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input
                      id="apellidos"
                      name="apellidos"
                      className={clase('apellidos')}
                      value={datos.apellidos}
                      onChange={manejarCambio}
                    />
                    <div className="invalid-feedback">{errores.apellidos}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      className={clase('correo')}
                      value={datos.correo}
                      onChange={manejarCambio}
                    />
                    <div className="invalid-feedback">{errores.correo}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="clave" className="form-label">Contraseña</label>
                    <input
                      id="clave"
                      name="clave"
                      type="password"
                      className={clase('clave')}
                      value={datos.clave}
                      onChange={manejarCambio}
                    />
                    <div className="invalid-feedback">{errores.clave}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="confirmarClave" className="form-label">Repetir contraseña</label>
                    <input
                      id="confirmarClave"
                      name="confirmarClave"
                      type="password"
                      className={clase('confirmarClave')}
                      value={datos.confirmarClave}
                      onChange={manejarCambio}
                    />
                    <div className="invalid-feedback">{errores.confirmarClave}</div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Crear cuenta
                </button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registro
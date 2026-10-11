import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { validarLogin } from '../../utils/validaciones.js'

function Login() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({ correo: '', clave: '' })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  const clase = (campo) => 'form-control' + (errores[campo] ? ' is-invalid' : '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    setErrorGeneral('')

    const erroresEncontrados = validarLogin(datos)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) {
      return
    }

    const exito = iniciarSesion(datos.correo, datos.clave)
    if (exito) {
      navigate('/')
    } else {
      setErrorGeneral('Correo o contraseña incorrectos.')
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-4">Iniciar sesión</h1>

              {errorGeneral && (
                <div className="alert alert-danger py-2" role="alert">
                  {errorGeneral}
                </div>
              )}

              <form onSubmit={manejarEnvio} noValidate>
                <div className="mb-3">
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

                <div className="mb-4">
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

                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
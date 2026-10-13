import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { validarPerfil } from '../../utils/validaciones.js'

function Perfil() {
  const { usuario, actualizarPerfil } = useAuth()
  const [datos, setDatos] = useState({
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    clave: '',
    confirmarClave: '',
  })
  const [errores, setErrores] = useState({})
  const [guardado, setGuardado] = useState(false)

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    setGuardado(false)
  }

  const clase = (campo) => 'form-control' + (errores[campo] ? ' is-invalid' : '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const erroresEncontrados = validarPerfil(datos)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) {
      return
    }

    const cambios = {
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
    }
    if (datos.clave) {
      cambios.clave = datos.clave
    }

    actualizarPerfil(cambios)
    setDatos({ ...datos, clave: '', confirmarClave: '' })
    setGuardado(true)
  }

  return (
    <>
      <h1 className="h3 mb-4">Perfil</h1>

      <form onSubmit={manejarEnvio} noValidate className="card shadow-sm">
        <div className="card-body">
          {guardado && (
            <div className="alert alert-success py-2" role="alert">
              Perfil actualizado.
            </div>
          )}

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input id="nombre" name="nombre" className={clase('nombre')} value={datos.nombre} onChange={manejarCambio} />
              <div className="invalid-feedback">{errores.nombre}</div>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input id="apellidos" name="apellidos" className={clase('apellidos')} value={datos.apellidos} onChange={manejarCambio} />
              <div className="invalid-feedback">{errores.apellidos}</div>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input id="correo" className="form-control" value={usuario.correo} disabled />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="rol" className="form-label">Rol</label>
              <input id="rol" className="form-control" value={usuario.rol} disabled />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="clave" className="form-label">Nueva contraseña (opcional)</label>
              <input id="clave" name="clave" type="password" className={clase('clave')} value={datos.clave} onChange={manejarCambio} />
              <div className="invalid-feedback">{errores.clave}</div>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="confirmarClave" className="form-label">Repetir nueva contraseña</label>
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
        </div>

        <div className="card-footer d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>
    </>
  )
}

export default Perfil
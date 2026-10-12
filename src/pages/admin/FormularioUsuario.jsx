import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  actualizarUsuario,
  buscarUsuarioPorCorreo,
  crearUsuario,
  obtenerUsuarioPorId,
} from '../../data/usuarios.js'
import { validarUsuario } from '../../utils/validaciones.js'

function FormularioUsuario() {
  const { id } = useParams()
  const navigate = useNavigate()
  const existente = id ? obtenerUsuarioPorId(id) : null
  const [datos, setDatos] = useState({
    nombre: existente ? existente.nombre : '',
    apellidos: existente ? existente.apellidos : '',
    correo: existente ? existente.correo : '',
    clave: '',
    rol: existente ? existente.rol : 'cliente',
  })
  const [errores, setErrores] = useState({})

  if (id && !existente) {
    return (
      <>
        <h1 className="h3 mb-3">Usuario no encontrado</h1>
        <Link className="btn btn-primary" to="/admin/usuarios">
          Volver a usuarios
        </Link>
      </>
    )
  }

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  const clase = (campo) => 'form-control' + (errores[campo] ? ' is-invalid' : '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const erroresEncontrados = validarUsuario(datos, Boolean(existente))

    if (!erroresEncontrados.correo) {
      const otro = buscarUsuarioPorCorreo(datos.correo)
      if (otro && (!existente || otro.id !== existente.id)) {
        erroresEncontrados.correo = 'El correo ya está registrado.'
      }
    }

    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) {
      return
    }

    if (existente) {
      const cambios = {
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        correo: datos.correo.trim(),
        rol: datos.rol,
      }
      if (datos.clave) {
        cambios.clave = datos.clave
      }
      actualizarUsuario(existente.id, cambios)
    } else {
      crearUsuario({
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        correo: datos.correo.trim(),
        clave: datos.clave,
        rol: datos.rol,
      })
    }
    navigate('/admin/usuarios')
  }

  return (
    <>
      <h1 className="h3 mb-4">{existente ? 'Editar usuario' : 'Nuevo usuario'}</h1>

      <form onSubmit={manejarEnvio} noValidate className="card shadow-sm">
        <div className="card-body">
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

            <div className="col-12">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input id="correo" name="correo" type="email" className={clase('correo')} value={datos.correo} onChange={manejarCambio} />
              <div className="invalid-feedback">{errores.correo}</div>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="clave" className="form-label">
                Contraseña{existente ? ' (dejar vacío para no cambiarla)' : ''}
              </label>
              <input id="clave" name="clave" type="password" className={clase('clave')} value={datos.clave} onChange={manejarCambio} />
              <div className="invalid-feedback">{errores.clave}</div>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="rol" className="form-label">Rol</label>
              <select
                id="rol"
                name="rol"
                className={'form-select' + (errores.rol ? ' is-invalid' : '')}
                value={datos.rol}
                onChange={manejarCambio}
              >
                <option value="cliente">cliente</option>
                <option value="admin">admin</option>
              </select>
              <div className="invalid-feedback">{errores.rol}</div>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end gap-2">
          <Link className="btn btn-secondary" to="/admin/usuarios">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            {existente ? 'Guardar cambios' : 'Crear usuario'}
          </button>
        </div>
      </form>
    </>
  )
}

export default FormularioUsuario
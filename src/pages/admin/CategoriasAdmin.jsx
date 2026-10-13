import { useState } from 'react'
import {
  contarProductos,
  crearCategoria,
  eliminarCategoria,
  obtenerCategorias,
  renombrarCategoria,
} from '../../data/categorias.js'
import { validarCategoria } from '../../utils/validaciones.js'

function CategoriasAdmin() {
  const [categorias, setCategorias] = useState(() => obtenerCategorias())
  const [nombreNuevo, setNombreNuevo] = useState('')
  const [errorNuevo, setErrorNuevo] = useState('')
  const [idEdicion, setIdEdicion] = useState(null)
  const [nombreEdicion, setNombreEdicion] = useState('')
  const [errorEdicion, setErrorEdicion] = useState('')

  const recargar = () => setCategorias(obtenerCategorias())

  const manejarCrear = (evento) => {
    evento.preventDefault()
    const errores = validarCategoria(nombreNuevo, categorias, null)
    setErrorNuevo(errores.nombre || '')
    if (errores.nombre) {
      return
    }
    crearCategoria(nombreNuevo)
    setNombreNuevo('')
    recargar()
  }

  const iniciarEdicion = (categoria) => {
    setIdEdicion(categoria.id)
    setNombreEdicion(categoria.nombre)
    setErrorEdicion('')
  }

  const cancelarEdicion = () => {
    setIdEdicion(null)
    setErrorEdicion('')
  }

  const guardarEdicion = () => {
    const errores = validarCategoria(nombreEdicion, categorias, idEdicion)
    setErrorEdicion(errores.nombre || '')
    if (errores.nombre) {
      return
    }
    renombrarCategoria(idEdicion, nombreEdicion)
    setIdEdicion(null)
    recargar()
  }

  const manejarEliminar = (categoria) => {
    if (window.confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) {
      eliminarCategoria(categoria.id)
      recargar()
    }
  }

  return (
    <>
      <h1 className="h3 mb-4">Categorías</h1>

      <form onSubmit={manejarCrear} noValidate className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h6">Nueva categoría</h2>
          <div className="d-flex flex-wrap gap-2">
            <div className="flex-grow-1">
              <input
                type="text"
                aria-label="Nombre de la nueva categoría"
                className={'form-control' + (errorNuevo ? ' is-invalid' : '')}
                placeholder="Ej: Gaming"
                value={nombreNuevo}
                onChange={(evento) => setNombreNuevo(evento.target.value)}
              />
              <div className="invalid-feedback">{errorNuevo}</div>
            </div>
            <button type="submit" className="btn btn-primary align-self-start">
              Agregar
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => {
              const cantidad = contarProductos(categoria.nombre)
              const editando = idEdicion === categoria.id

              return (
                <tr key={categoria.id}>
                  <td>
                    {editando ? (
                      <>
                        <input
                          type="text"
                          aria-label="Nuevo nombre de la categoría"
                          className={'form-control' + (errorEdicion ? ' is-invalid' : '')}
                          value={nombreEdicion}
                          onChange={(evento) => setNombreEdicion(evento.target.value)}
                        />
                        <div className="invalid-feedback">{errorEdicion}</div>
                      </>
                    ) : (
                      categoria.nombre
                    )}
                  </td>
                  <td>{cantidad}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      {editando ? (
                        <>
                          <button type="button" className="btn btn-primary btn-sm" onClick={guardarEdicion}>
                            Guardar
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={cancelarEdicion}>
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => iniciarEdicion(categoria)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            disabled={cantidad > 0}
                            title={cantidad > 0 ? 'No se puede eliminar una categoría con productos' : ''}
                            onClick={() => manejarEliminar(categoria)}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CategoriasAdmin
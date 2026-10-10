import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext.jsx'
import { crearOrden } from '../../data/ordenes.js'
import { validarDatosEnvio } from '../../utils/validaciones.js'

const REGIONES = {
  'Región Metropolitana de Santiago': ['Santiago', 'Cerrillos', 'Las Condes', 'Maipú', 'Providencia'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
}

const DATOS_INICIALES = {
  nombre: '',
  apellidos: '',
  correo: '',
  calle: '',
  departamento: '',
  region: '',
  comuna: '',
  indicaciones: '',
  resultadoPago: 'aprobado',
}

function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

function Checkout() {
  const { items, total, vaciar } = useCarrito()
  const navigate = useNavigate()
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})

  if (items.length === 0) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3 mb-3">No hay productos para comprar</h1>
        <Link className="btn btn-primary" to="/productos">
          Ver productos
        </Link>
      </section>
    )
  }

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    // Al cambiar de región se reinicia la comuna, porque depende de la región elegida.
    if (name === 'region') {
      setDatos({ ...datos, region: value, comuna: '' })
    } else {
      setDatos({ ...datos, [name]: value })
    }
  }

  const clase = (campo) => 'form-control' + (errores[campo] ? ' is-invalid' : '')
  const claseSelect = (campo) => 'form-select' + (errores[campo] ? ' is-invalid' : '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const erroresEncontrados = validarDatosEnvio(datos)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) {
      return
    }

    const aprobado = datos.resultadoPago === 'aprobado'

    const orden = crearOrden({
      cliente: { nombre: datos.nombre, apellidos: datos.apellidos, correo: datos.correo },
      direccion: {
        calle: datos.calle,
        departamento: datos.departamento,
        region: datos.region,
        comuna: datos.comuna,
        indicaciones: datos.indicaciones,
      },
      items,
      total,
      estado: aprobado ? 'pagada' : 'rechazada',
    })

    if (aprobado) {
      vaciar()
      navigate(`/compra-exitosa/${orden.id}`)
    } else {
      navigate(`/compra-error/${orden.id}`)
    }
  }

  const comunas = datos.region ? REGIONES[datos.region] : []

  return (
    <section className="container py-4">
      <h1 className="h3 mb-4">Checkout</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <form onSubmit={manejarEnvio} noValidate>
            <h2 className="h5">Información del cliente</h2>
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                <input id="nombre" name="nombre" className={clase('nombre')} value={datos.nombre} onChange={manejarCambio} />
                <div className="invalid-feedback">{errores.nombre}</div>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="apellidos" className="form-label">Apellidos *</label>
                <input id="apellidos" name="apellidos" className={clase('apellidos')} value={datos.apellidos} onChange={manejarCambio} />
                <div className="invalid-feedback">{errores.apellidos}</div>
              </div>
              <div className="col-12">
                <label htmlFor="correo" className="form-label">Correo *</label>
                <input id="correo" name="correo" type="email" className={clase('correo')} value={datos.correo} onChange={manejarCambio} />
                <div className="invalid-feedback">{errores.correo}</div>
              </div>
            </div>

            <h2 className="h5">Dirección de entrega</h2>
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-8">
                <label htmlFor="calle" className="form-label">Calle *</label>
                <input id="calle" name="calle" className={clase('calle')} value={datos.calle} onChange={manejarCambio} />
                <div className="invalid-feedback">{errores.calle}</div>
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="departamento" className="form-label">Departamento (opcional)</label>
                <input id="departamento" name="departamento" className="form-control" placeholder="Ej: 603" value={datos.departamento} onChange={manejarCambio} />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="region" className="form-label">Región *</label>
                <select id="region" name="region" className={claseSelect('region')} value={datos.region} onChange={manejarCambio}>
                  <option value="">Selecciona una región</option>
                  {Object.keys(REGIONES).map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <div className="invalid-feedback">{errores.region}</div>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="comuna" className="form-label">Comuna *</label>
                <select id="comuna" name="comuna" className={claseSelect('comuna')} value={datos.comuna} onChange={manejarCambio} disabled={!datos.region}>
                  <option value="">Selecciona una comuna</option>
                  {comunas.map((comuna) => (
                    <option key={comuna} value={comuna}>{comuna}</option>
                  ))}
                </select>
                <div className="invalid-feedback">{errores.comuna}</div>
              </div>
              <div className="col-12">
                <label htmlFor="indicaciones" className="form-label">Indicaciones para la entrega (opcional)</label>
                <textarea id="indicaciones" name="indicaciones" rows="3" className="form-control" placeholder="Ej: entre calles, color del edificio" value={datos.indicaciones} onChange={manejarCambio} />
              </div>
            </div>

            <h2 className="h5">Pago</h2>
            <div className="mb-4">
              <label htmlFor="resultadoPago" className="form-label">Resultado del pago (simulación)</label>
              <select id="resultadoPago" name="resultadoPago" className="form-select" value={datos.resultadoPago} onChange={manejarCambio}>
                <option value="aprobado">Pago aprobado</option>
                <option value="rechazado">Pago rechazado</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Pagar ahora {formatearPrecio(total)}
            </button>
          </form>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 mb-3">Resumen del carrito</h2>
              <ul className="list-group list-group-flush mb-3">
                {items.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>{item.nombre} x {item.cantidad}</span>
                    <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                  </li>
                ))}
              </ul>
              <p className="fw-bold fs-5 d-flex justify-content-between mb-0">
                <span>Total a pagar</span>
                <span>{formatearPrecio(total)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
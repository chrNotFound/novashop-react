export function validarDatosEnvio(datos) {
  const errores = {}

  if (!datos.nombre.trim()) {
    errores.nombre = 'Ingresa tu nombre.'
  }

  if (!datos.apellidos.trim()) {
    errores.apellidos = 'Ingresa tus apellidos.'
  }

  if (!datos.correo.trim()) {
    errores.correo = 'Ingresa tu correo.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
    errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }

  if (!datos.calle.trim()) {
    errores.calle = 'Ingresa la calle y el número.'
  }

  if (!datos.region) {
    errores.region = 'Selecciona una región.'
  }

  if (!datos.comuna) {
    errores.comuna = 'Selecciona una comuna.'
  }

  return errores
}
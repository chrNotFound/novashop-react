const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  } else if (!REGEX_CORREO.test(datos.correo)) {
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

export function validarLogin(datos) {
  const errores = {}

  if (!datos.correo.trim()) {
    errores.correo = 'Ingresa tu correo.'
  } else if (!REGEX_CORREO.test(datos.correo)) {
    errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }

  if (!datos.clave) {
    errores.clave = 'Ingresa tu contraseña.'
  }

  return errores
}

export function validarRegistro(datos) {
  const errores = {}

  if (!datos.nombre.trim()) {
    errores.nombre = 'Ingresa tu nombre.'
  }

  if (!datos.apellidos.trim()) {
    errores.apellidos = 'Ingresa tus apellidos.'
  }

  if (!datos.correo.trim()) {
    errores.correo = 'Ingresa tu correo.'
  } else if (!REGEX_CORREO.test(datos.correo)) {
    errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }

  if (!datos.clave) {
    errores.clave = 'Crea una contraseña.'
  } else if (datos.clave.length < 6) {
    errores.clave = 'La contraseña debe tener al menos 6 caracteres.'
  } else if (!/[A-Za-z]/.test(datos.clave) || !/\d/.test(datos.clave)) {
    errores.clave = 'La contraseña debe combinar letras y números.'
  }

  if (!datos.confirmarClave) {
    errores.confirmarClave = 'Repite la contraseña.'
  } else if (datos.confirmarClave !== datos.clave) {
    errores.confirmarClave = 'Las contraseñas no coinciden.'
  }

  return errores
}

export function validarContacto(datos) {
  const errores = {}

  if (!datos.nombre.trim()) {
    errores.nombre = 'Ingresa tu nombre completo.'
  }

  if (datos.correo.trim() && !REGEX_CORREO.test(datos.correo)) {
    errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }

  if (!datos.comentario.trim()) {
    errores.comentario = 'Escribe tu comentario.'
  } else if (datos.comentario.trim().length < 10) {
    errores.comentario = 'El comentario debe tener al menos 10 caracteres.'
  }

  return errores
}
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
export function validarProducto(datos) {
  const errores = {}

  if (!datos.nombre.trim()) {
    errores.nombre = 'Ingresa el nombre del producto.'
  }

  if (!datos.categoria.trim()) {
    errores.categoria = 'Ingresa la categoría.'
  }

  const precio = Number(datos.precio)
  if (datos.precio.trim() === '' || Number.isNaN(precio) || precio <= 0) {
    errores.precio = 'Ingresa un precio mayor a 0.'
  } else if (!Number.isInteger(precio)) {
    errores.precio = 'El precio debe ser un número entero.'
  }

  const stock = Number(datos.stock)
  if (datos.stock.trim() === '' || !Number.isInteger(stock) || stock < 0) {
    errores.stock = 'El stock debe ser un número entero mayor o igual a 0.'
  }

  const descuento = Number(datos.descuento)
  if (datos.descuento.trim() === '' || !Number.isInteger(descuento) || descuento < 0 || descuento > 100) {
    errores.descuento = 'El descuento debe ser un número entero entre 0 y 100.'
  }

  if (!datos.imagen.trim()) {
    errores.imagen = 'Ingresa la ruta de la imagen, por ejemplo /Imagen/producto.jpg.'
  } else if (!/^(\/|https?:\/\/)/.test(datos.imagen.trim())) {
    errores.imagen = 'La ruta debe empezar con / o con https://.'
  }

  if (!datos.descripcion.trim()) {
    errores.descripcion = 'Ingresa la descripción del producto.'
  }

  return errores
}
export function validarUsuario(datos, esEdicion) {
  const errores = {}

  if (!datos.nombre.trim()) {
    errores.nombre = 'Ingresa el nombre.'
  }

  if (!datos.apellidos.trim()) {
    errores.apellidos = 'Ingresa los apellidos.'
  }

  if (!datos.correo.trim()) {
    errores.correo = 'Ingresa el correo.'
  } else if (!REGEX_CORREO.test(datos.correo)) {
    errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }

  const claveObligatoria = !esEdicion || datos.clave !== ''
  if (claveObligatoria) {
    if (!datos.clave) {
      errores.clave = 'Ingresa una contraseña.'
    } else if (datos.clave.length < 6) {
      errores.clave = 'La contraseña debe tener al menos 6 caracteres.'
    } else if (!/[A-Za-z]/.test(datos.clave) || !/\d/.test(datos.clave)) {
      errores.clave = 'La contraseña debe combinar letras y números.'
    }
  }

  if (datos.rol !== 'admin' && datos.rol !== 'cliente') {
    errores.rol = 'Selecciona un rol.'
  }

  return errores
}
export function validarCategoria(nombre, categorias, idActual) {
  const errores = {}
  const limpio = nombre.trim()

  if (!limpio) {
    errores.nombre = 'Ingresa el nombre de la categoría.'
  } else if (limpio.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.'
  } else if (
    categorias.some(
      (categoria) => categoria.id !== idActual && categoria.nombre.toLowerCase() === limpio.toLowerCase()
    )
  ) {
    errores.nombre = 'Ya existe una categoría con ese nombre.'
  }

  return errores
}

export function validarPerfil(datos) {
  const errores = {}

  if (!datos.nombre.trim()) {
    errores.nombre = 'Ingresa tu nombre.'
  }

  if (!datos.apellidos.trim()) {
    errores.apellidos = 'Ingresa tus apellidos.'
  }

  if (datos.clave) {
    if (datos.clave.length < 6) {
      errores.clave = 'La contraseña debe tener al menos 6 caracteres.'
    } else if (!/[A-Za-z]/.test(datos.clave) || !/\d/.test(datos.clave)) {
      errores.clave = 'La contraseña debe combinar letras y números.'
    }

    if (datos.confirmarClave !== datos.clave) {
      errores.confirmarClave = 'Las contraseñas no coinciden.'
    }
  }

  return errores
}
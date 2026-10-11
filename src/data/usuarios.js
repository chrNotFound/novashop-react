const CLAVE_STORAGE = 'usuariosNovaShop'

const usuariosIniciales = [
  {
    id: 1,
    nombre: 'Admin',
    apellidos: 'NovaShop',
    correo: 'admin@novashop.cl',
    clave: 'Admin123',
    rol: 'admin',
  },
  {
    id: 2,
    nombre: 'Cliente',
    apellidos: 'Demo',
    correo: 'cliente@novashop.cl',
    clave: 'Cliente123',
    rol: 'cliente',
  },
]

function guardar(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista))
}

export function obtenerUsuarios() {
  try {
    const guardados = localStorage.getItem(CLAVE_STORAGE)
    if (guardados) {
      return JSON.parse(guardados)
    }
  } catch (error) {
    console.error('No se pudieron leer los usuarios guardados:', error)
  }
  guardar(usuariosIniciales)
  return [...usuariosIniciales]
}

export function obtenerUsuarioPorId(id) {
  return obtenerUsuarios().find((usuario) => usuario.id === Number(id))
}

export function buscarUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase()
  return obtenerUsuarios().find((usuario) => usuario.correo.toLowerCase() === buscado)
}

export function autenticar(correo, clave) {
  const usuario = buscarUsuarioPorCorreo(correo)
  if (usuario && usuario.clave === clave) {
    return usuario
  }
  return null
}

export function crearUsuario(datos) {
  if (buscarUsuarioPorCorreo(datos.correo)) {
    throw new Error('El correo ya está registrado.')
  }
  const lista = obtenerUsuarios()
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((u) => u.id)) + 1 : 1
  const nuevo = { rol: 'cliente', ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarUsuario(id, cambios) {
  const lista = obtenerUsuarios()
  const indice = lista.findIndex((usuario) => usuario.id === Number(id))
  if (indice === -1) {
    return null
  }
  lista[indice] = { ...lista[indice], ...cambios, id: lista[indice].id }
  guardar(lista)
  return lista[indice]
}

export function eliminarUsuario(id) {
  const lista = obtenerUsuarios()
  const filtrada = lista.filter((usuario) => usuario.id !== Number(id))
  if (filtrada.length === lista.length) {
    return false
  }
  guardar(filtrada)
  return true
}

export function reiniciarUsuarios() {
  guardar(usuariosIniciales)
  return [...usuariosIniciales]
}
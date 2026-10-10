
const CLAVE_STORAGE = 'ordenesNovaShop'
const ID_INICIAL = 1001

function leer() {
  try {
    const guardadas = localStorage.getItem(CLAVE_STORAGE)
    return guardadas ? JSON.parse(guardadas) : []
  } catch (error) {
    console.error('No se pudieron leer las órdenes guardadas:', error)
    return []
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista))
}

// READ
export function obtenerOrdenes() {
  return leer()
}

export function obtenerOrdenPorId(id) {
  return leer().find((orden) => orden.id === Number(id))
}

// CREATE
export function crearOrden(datos) {
  const lista = leer()
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((o) => o.id)) + 1 : ID_INICIAL
  const orden = { ...datos, id: nuevoId, fecha: new Date().toISOString() }
  guardar([...lista, orden])
  return orden
}

// UPDATE
export function actualizarEstadoOrden(id, estado) {
  const lista = leer()
  const indice = lista.findIndex((orden) => orden.id === Number(id))
  if (indice === -1) {
    return null
  }
  lista[indice] = { ...lista[indice], estado }
  guardar(lista)
  return lista[indice]
}

// DELETE
export function eliminarOrden(id) {
  const lista = leer()
  const filtrada = lista.filter((orden) => orden.id !== Number(id))
  if (filtrada.length === lista.length) {
    return false
  }
  guardar(filtrada)
  return true
}
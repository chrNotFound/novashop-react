import { actualizarProducto, obtenerProductos } from './productos.js'

const CLAVE_STORAGE = 'categoriasNovaShop'

const categoriasIniciales = [
  { id: 1, nombre: 'Audio' },
  { id: 2, nombre: 'Componentes PC' },
  { id: 3, nombre: 'Perifericos' },
  { id: 4, nombre: 'Wearables' },
]

function guardar(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista))
}

function leerGuardadas() {
  try {
    const guardadas = localStorage.getItem(CLAVE_STORAGE)
    if (guardadas) {
      return JSON.parse(guardadas)
    }
  } catch (error) {
    console.error('No se pudieron leer las categorías guardadas:', error)
  }
  return [...categoriasIniciales]
}

export function obtenerCategorias() {
  const lista = leerGuardadas()
  const nombres = new Set(lista.map((categoria) => categoria.nombre))
  let cambio = false

  obtenerProductos().forEach((producto) => {
    if (producto.categoria && !nombres.has(producto.categoria)) {
      const nuevoId = Math.max(0, ...lista.map((categoria) => categoria.id)) + 1
      lista.push({ id: nuevoId, nombre: producto.categoria })
      nombres.add(producto.categoria)
      cambio = true
    }
  })

  if (cambio || !localStorage.getItem(CLAVE_STORAGE)) {
    guardar(lista)
  }
  return lista
}

export function contarProductos(nombreCategoria) {
  return obtenerProductos().filter((producto) => producto.categoria === nombreCategoria).length
}

export function crearCategoria(nombre) {
  const lista = obtenerCategorias()
  const nuevoId = Math.max(0, ...lista.map((categoria) => categoria.id)) + 1
  const nueva = { id: nuevoId, nombre: nombre.trim() }
  guardar([...lista, nueva])
  return nueva
}

export function renombrarCategoria(id, nombre) {
  const lista = obtenerCategorias()
  const indice = lista.findIndex((categoria) => categoria.id === Number(id))
  if (indice === -1) {
    return null
  }

  const anterior = lista[indice].nombre
  const nuevo = nombre.trim()
  lista[indice] = { ...lista[indice], nombre: nuevo }
  guardar(lista)

  obtenerProductos()
    .filter((producto) => producto.categoria === anterior)
    .forEach((producto) => actualizarProducto(producto.id, { categoria: nuevo }))

  return lista[indice]
}

export function eliminarCategoria(id) {
  const lista = obtenerCategorias()
  const categoria = lista.find((item) => item.id === Number(id))
  if (!categoria || contarProductos(categoria.nombre) > 0) {
    return false
  }
  guardar(lista.filter((item) => item.id !== Number(id)))
  return true
}
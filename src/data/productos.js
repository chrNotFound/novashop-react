const CLAVE_STORAGE = 'productosNovaShop2'

const productosIniciales = [
  {
    id: 1,
    nombre: 'Audifonos Gamer Inalambrico HyperX Cloud III',
    precio: 99990,
    stock: 15,
    atributo: 'Cable 3.5mm / USB-C',
    categoria: 'Audio',
    descuento: 15,
    imagen: '/Imagen/AudifonosHyperXCloudIII.jpg',
    descripcion: 'Audifonos gamer inalambricos con sonido envolvente, microfono desmontable y hasta 120 horas de bateria. Compatibles con PC, PS5 y Nintendo Switch.',
  },
  {
    id: 2,
    nombre: 'Corsair Memoria RAM Vengeance RGB DDR5',
    precio: 549990,
    stock: 10,
    atributo: '16GB (2x8GB) 5200MHz',
    categoria: 'Componentes PC',
    descuento: 0,
    imagen: '/Imagen/Corsair Memoria RAM Vengeance RGB DDR5.jpg',
    descripcion: 'Memoria RAM DDR5 con iluminacion RGB dinamica, ideal para equipos gamer y de alto rendimiento.',
  },
  {
    id: 3,
    nombre: 'Kingston FURY Beast Memoria RAM DDR4',
    precio: 145990,
    stock: 20,
    atributo: '16GB 3200MHz',
    categoria: 'Componentes PC',
    descuento: 10,
    imagen: '/Imagen/Kingston FURY Beast Memoria RAM DDR4.jpg',
    descripcion: 'Memoria RAM DDR4 de alto rendimiento con disipador de calor, compatible con la mayoria de placas madre.',
  },
  {
    id: 4,
    nombre: 'Mouse Gamer Logitech G305 Lightspeed Wireless',
    precio: 29990,
    stock: 25,
    atributo: '12.000 DPI Inalambrico',
    categoria: 'Perifericos',
    descuento: 0,
    imagen: '/Imagen/Mouse Gamer logitech G305 Lightspeed Wireless negro.jpg',
    descripcion: 'Mouse gamer inalambrico con sensor de alta precision y hasta 250 horas de autonomia con una sola pila.',
  },
  {
    id: 5,
    nombre: 'Sony WH-CH520',
    precio: 34990,
    stock: 18,
    atributo: 'Bluetooth / 50h autonomia',
    categoria: 'Audio',
    descuento: 20,
    imagen: '/Imagen/Sony WH CH520.jpg',
    descripcion: 'Audifonos inalambricos livianos, comodos para uso diario, con hasta 50 horas de bateria.',
  },
  {
    id: 6,
    nombre: 'Teclado Gamer Redragon Kumara K552 RGB TKL',
    precio: 34990,
    stock: 12,
    atributo: 'Mecanico Switch Red',
    categoria: 'Perifericos',
    descuento: 0,
    imagen: '/Imagen/Teclado Gamer Redragon Kumara K552 RGB TKL.jpg',
    descripcion: 'Teclado mecanico TKL con retroiluminacion RGB y switches red, ideal para gaming y escritura rapida.',
  },
  {
    id: 7,
    nombre: 'Xiaomi Redmi Buds 6 Play',
    precio: 12990,
    stock: 30,
    atributo: 'Bluetooth / 36h con estuche',
    categoria: 'Audio',
    descuento: 25,
    imagen: '/Imagen/Xiaomi Redmi Buds 6 Play.jpg',
    descripcion: 'Audifonos inalambricos compactos con estuche de carga, resistencia al agua y buena calidad de sonido.',
  },
  {
    id: 8,
    nombre: 'Xiaomi Redmi Watch 5 Active',
    precio: 34990,
    stock: 14,
    atributo: 'Pantalla 2" / 5 ATM',
    categoria: 'Wearables',
    descuento: 0,
    imagen: '/Imagen/Xiaomi Redmi Watch 5 Active.jpg',
    descripcion: 'Smartwatch con pantalla de 2 pulgadas, resistencia al agua 5 ATM y mas de 100 modos deportivos.',
  },
  {
    id: 9,
    nombre: 'Audifonos Inalambricos con Cancelacion de Ruido',
    precio: 45990,
    stock: 16,
    atributo: 'Bluetooth / ANC',
    categoria: 'Audio',
    descuento: 0,
    imagen: '/Imagen/AudifonosCanceRuido.jpg',
    descripcion: 'Audifonos over-ear con cancelacion activa de ruido, ideales para viajes, estudio y oficina.',
  },
  {
    id: 10,
    nombre: 'Cargador para Notebook Universal',
    precio: 19990,
    stock: 22,
    atributo: '65W / Multiples conectores',
    categoria: 'Componentes PC',
    descuento: 0,
    imagen: '/Imagen/cargadorPc.jpg',
    descripcion: 'Cargador universal para notebook de 65W, compatible con distintas marcas y modelos.',
  },
]

function guardar(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista))
}

export function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_STORAGE)
    if (guardados) {
      return JSON.parse(guardados)
    }
  } catch (error) {
    console.error('No se pudieron leer los productos guardados:', error)
  }
  guardar(productosIniciales)
  return [...productosIniciales]
}

export function obtenerProductoPorId(id) {
  return obtenerProductos().find((producto) => producto.id === Number(id))
}

export function crearProducto(datos) {
  const lista = obtenerProductos()
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((p) => p.id)) + 1 : 1
  const nuevo = { ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarProducto(id, cambios) {
  const lista = obtenerProductos()
  const indice = lista.findIndex((producto) => producto.id === Number(id))
  if (indice === -1) {
    return null
  }
  lista[indice] = { ...lista[indice], ...cambios, id: lista[indice].id }
  guardar(lista)
  return lista[indice]
}

export function eliminarProducto(id) {
  const lista = obtenerProductos()
  const filtrada = lista.filter((producto) => producto.id !== Number(id))
  if (filtrada.length === lista.length) {
    return false
  }
  guardar(filtrada)
  return true
}

export function reiniciarProductos() {
  guardar(productosIniciales)
  return [...productosIniciales]
}
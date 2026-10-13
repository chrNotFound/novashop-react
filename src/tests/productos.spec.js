import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductoPorId,
  obtenerProductos,
} from '../data/productos.js'

describe('base de datos simulada de productos (CRUD)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('carga los productos iniciales cuando no hay datos guardados', () => {
    const productos = obtenerProductos()

    expect(productos.length).toBeGreaterThan(0)
    expect(localStorage.getItem('productosNovaShop2')).not.toBeNull()
  })

  it('crearProducto asigna el siguiente id y guarda el producto', () => {
    const cantidadInicial = obtenerProductos().length
    const nuevo = crearProducto({ nombre: 'Producto de prueba', precio: 1000, stock: 5 })

    expect(nuevo.id).toBe(cantidadInicial + 1)
    expect(obtenerProductoPorId(nuevo.id).nombre).toBe('Producto de prueba')
  })

  it('actualizarProducto modifica solo los campos indicados', () => {
    const actualizado = actualizarProducto(1, { precio: 5000 })

    expect(actualizado.precio).toBe(5000)
    expect(actualizado.nombre).toBe(obtenerProductoPorId(1).nombre)
  })

  it('actualizarProducto devuelve null si el producto no existe', () => {
    expect(actualizarProducto(999, { precio: 1 })).toBeNull()
  })

  it('eliminarProducto quita el producto de la lista', () => {
    expect(eliminarProducto(1)).toBeTrue()
    expect(obtenerProductoPorId(1)).toBeUndefined()
  })

  it('usa los datos iniciales si el almacenamiento tiene un JSON dañado (mock)', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{esto no es json')
    const errorSpy = spyOn(console, 'error')

    const productos = obtenerProductos()

    expect(errorSpy).toHaveBeenCalled()
    expect(productos.length).toBeGreaterThan(0)
  })
})
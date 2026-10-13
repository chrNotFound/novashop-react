import { act, renderHook } from '@testing-library/react'
import { CarritoProvider, useCarrito } from '../context/CarritoContext.jsx'

const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>

const audifonos = { id: 1, nombre: 'Audifonos', precio: 100000, descuento: 20, stock: 3, imagen: '/a.jpg' }
const mouse = { id: 2, nombre: 'Mouse', precio: 30000, descuento: 0, stock: 10, imagen: '/b.jpg' }

describe('contexto del carrito', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('agrega un producto y actualiza la cantidad total', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper })

    act(() => result.current.agregar(audifonos, 2))

    expect(result.current.items.length).toBe(1)
    expect(result.current.cantidadTotal).toBe(2)
  })

  it('no permite superar el stock disponible al agregar el mismo producto', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper })

    act(() => result.current.agregar(audifonos, 2))
    act(() => result.current.agregar(audifonos, 2))

    expect(result.current.items[0].cantidad).toBe(3)
  })

  it('calcula el total usando el precio con descuento', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper })

    act(() => result.current.agregar(audifonos, 1))
    act(() => result.current.agregar(mouse, 2))

    expect(result.current.total).toBe(80000 + 60000)
  })

  it('quita un producto y vacía el carrito', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper })

    act(() => result.current.agregar(audifonos, 1))
    act(() => result.current.agregar(mouse, 1))
    act(() => result.current.quitar(1))
    expect(result.current.items.length).toBe(1)

    act(() => result.current.vaciar())
    expect(result.current.items.length).toBe(0)
  })

  it('guarda el carrito en localStorage', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper })

    act(() => result.current.agregar(mouse, 1))

    expect(JSON.parse(localStorage.getItem('carritoNovaShop')).length).toBe(1)
  })
})

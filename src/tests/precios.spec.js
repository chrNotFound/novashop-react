import { formatearPrecio, precioFinal } from '../utils/precios.js'

describe('utilidades de precios', () => {
  it('precioFinal devuelve el precio original cuando no hay descuento', () => {
    expect(precioFinal({ precio: 34990, descuento: 0 })).toBe(34990)
  })

  it('precioFinal aplica el porcentaje de descuento', () => {
    expect(precioFinal({ precio: 99990, descuento: 15 })).toBe(84992)
  })

  it('formatearPrecio agrega el signo $ y el separador de miles', () => {
    expect(formatearPrecio(99990)).toBe('$99.990')
  })
})
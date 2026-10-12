export const UMBRAL_STOCK_CRITICO = 15

export function esCritico(producto) {
  return producto.stock <= UMBRAL_STOCK_CRITICO
}
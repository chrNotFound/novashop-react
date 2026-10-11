export function precioFinal(producto) {
  const descuento = producto.descuento || 0
  if (descuento > 0) {
    return Math.round(producto.precio * (1 - descuento / 100))
  }
  return producto.precio
}

export function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}
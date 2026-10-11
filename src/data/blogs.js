const blogs = [
  {
    id: 1,
    titulo: 'Caso curioso #1: ¿Por qué tu cargador se calienta?',
    resumen: 'El calor es parte natural de convertir la corriente de tu enchufe en la que necesitan tus dispositivos.',
    contenido: [
      'Todos los cargadores generan algo de calor: es parte natural de convertir la corriente alterna de tu enchufe en la corriente continua que necesitan tus dispositivos. Ese proceso nunca es 100% eficiente, y la energía que se pierde en el camino se transforma en calor.',
      'La tecnología GaN (nitruro de galio) permite una conversión más eficiente, por eso los cargadores modernos son más pequeños, livianos y se calientan menos, incluso entregando la misma potencia que los antiguos.',
    ],
  },
  {
    id: 2,
    titulo: 'Caso curioso #2: Cancelación de ruido, cómo funciona',
    resumen: 'La cancelación activa de ruido no bloquea el sonido de forma física: genera una onda inversa que lo anula.',
    contenido: [
      'La cancelación activa de ruido (ANC) no bloquea el sonido de forma física. En cambio, usa pequeños micrófonos integrados en los audífonos para escuchar el ruido constante del entorno y generar una onda inversa que lo anula.',
      'Por eso el ANC funciona mejor con sonidos graves y constantes (como el motor de un avión) y es menos efectivo con sonidos agudos o repentinos, como una voz o una bocina.',
    ],
  },
]

export function obtenerBlogs() {
  return blogs
}

export function obtenerBlogPorId(id) {
  return blogs.find((blog) => blog.id === Number(id))
}
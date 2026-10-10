import { createContext, useContext, useEffect, useState } from 'react'

const CLAVE_STORAGE = 'carritoNovaShop'

const CarritoContext = createContext(null)

function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE)
    return guardado ? JSON.parse(guardado) : []
  } catch (error) {
    console.error('No se pudo leer el carrito guardado:', error)
    return []
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerCarritoGuardado)

  // Cada vez que cambia el carrito, se guarda para que no se pierda al recargar.
  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items))
  }, [items])

  const agregar = (producto, cantidad = 1) => {
    setItems((actuales) => {
      const existente = actuales.find((item) => item.id === producto.id)

      if (existente) {
        return actuales.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: Math.min(producto.stock, item.cantidad + cantidad) }
            : item
        )
      }

      return [
        ...actuales,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          stock: producto.stock,
          cantidad: Math.min(producto.stock, cantidad),
        },
      ]
    })
  }

  const cambiarCantidad = (id, cantidad) => {
    setItems((actuales) =>
      actuales.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, Math.min(item.stock, cantidad)) }
          : item
      )
    )
  }

  const quitar = (id) => {
    setItems((actuales) => actuales.filter((item) => item.id !== id))
  }

  const vaciar = () => setItems([])

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  const valor = { items, agregar, cambiarCantidad, quitar, vaciar, cantidadTotal, total }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  return contexto
}
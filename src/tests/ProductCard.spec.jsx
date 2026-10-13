import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

const productoBase = {
  id: 1,
  nombre: 'Audifonos de prueba',
  atributo: 'Bluetooth',
  precio: 99990,
  descuento: 0,
  stock: 15,
  imagen: '/Imagen/prueba.jpg',
}

function mostrar(producto, onAgregar) {
  return render(
    <MemoryRouter>
      <ProductCard producto={producto} onAgregar={onAgregar} />
    </MemoryRouter>
  )
}

describe('componente ProductCard', () => {
  it('renderiza el nombre, el precio y el stock del producto', () => {
    mostrar(productoBase)

    expect(screen.getByText('Audifonos de prueba')).toBeTruthy()
    expect(screen.getByText('$99.990')).toBeTruthy()
    expect(screen.getByText('Stock: 15')).toBeTruthy()
  })

  it('no muestra la etiqueta de descuento cuando el producto no está en oferta', () => {
    mostrar(productoBase)

    expect(screen.queryByText('-15%')).toBeNull()
  })

  it('muestra la etiqueta, el precio rebajado y el original tachado en una oferta', () => {
    mostrar({ ...productoBase, descuento: 15 })

    expect(screen.getByText('-15%')).toBeTruthy()
    expect(screen.getByText('$84.992')).toBeTruthy()
    expect(screen.getByText('$99.990')).toBeTruthy()
  })

  it('deshabilita el botón y muestra "Sin stock" cuando no quedan unidades', () => {
    mostrar({ ...productoBase, stock: 0 })

    expect(screen.getByText('Sin stock')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Agregar al carrito' }).disabled).toBeTrue()
  })

  it('llama a onAgregar con el producto al hacer clic en el botón (props y eventos)', () => {
    const onAgregar = jasmine.createSpy('onAgregar')
    mostrar(productoBase, onAgregar)

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(productoBase)
  })
})
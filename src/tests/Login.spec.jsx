import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/tienda/Login.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'

function mostrarLogin() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  )
}

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })
}

describe('página Login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('no muestra mensajes de error al abrir el formulario', () => {
    mostrarLogin()

    expect(screen.queryByText('Ingresa tu correo.')).toBeNull()
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('actualiza el estado del campo cuando el usuario escribe', () => {
    mostrarLogin()

    escribir('Correo', 'ana@correo.cl')

    expect(screen.getByLabelText('Correo').value).toBe('ana@correo.cl')
  })

  it('muestra los errores de validación al enviar el formulario vacío', () => {
    mostrarLogin()

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Ingresa tu correo.')).toBeTruthy()
    expect(screen.getByText('Ingresa tu contraseña.')).toBeTruthy()
  })

  it('muestra una alerta cuando las credenciales son incorrectas', () => {
    mostrarLogin()

    escribir('Correo', 'cliente@novashop.cl')
    escribir('Contraseña', 'ClaveEquivocada1')
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByRole('alert').textContent).toBe('Correo o contraseña incorrectos.')
  })

  it('guarda la sesión cuando las credenciales son correctas', () => {
    mostrarLogin()

    escribir('Correo', 'cliente@novashop.cl')
    escribir('Contraseña', 'Cliente123')
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(localStorage.getItem('sesionNovaShop')).toBe('2')
  })
})
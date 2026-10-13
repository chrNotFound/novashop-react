import { validarContacto, validarLogin, validarRegistro } from '../utils/validaciones.js'

describe('validaciones de formularios', () => {
  it('validarLogin exige correo y contraseña', () => {
    const errores = validarLogin({ correo: '', clave: '' })

    expect(errores.correo).toBe('Ingresa tu correo.')
    expect(errores.clave).toBe('Ingresa tu contraseña.')
  })

  it('validarLogin rechaza un correo con formato inválido', () => {
    const errores = validarLogin({ correo: 'pedro', clave: 'Abc123' })

    expect(errores.correo).toContain('correo válido')
    expect(errores.clave).toBeUndefined()
  })

  it('validarRegistro rechaza una contraseña sin números', () => {
    const errores = validarRegistro({
      nombre: 'Ana',
      apellidos: 'Pérez',
      correo: 'ana@correo.cl',
      clave: 'abcdefg',
      confirmarClave: 'abcdefg',
    })

    expect(errores.clave).toBe('La contraseña debe combinar letras y números.')
  })

  it('validarRegistro detecta contraseñas que no coinciden', () => {
    const errores = validarRegistro({
      nombre: 'Ana',
      apellidos: 'Pérez',
      correo: 'ana@correo.cl',
      clave: 'Clave123',
      confirmarClave: 'Clave124',
    })

    expect(errores.confirmarClave).toBe('Las contraseñas no coinciden.')
  })

  it('validarRegistro no devuelve errores con datos correctos', () => {
    const errores = validarRegistro({
      nombre: 'Ana',
      apellidos: 'Pérez',
      correo: 'ana@correo.cl',
      clave: 'Clave123',
      confirmarClave: 'Clave123',
    })

    expect(Object.keys(errores).length).toBe(0)
  })

  it('validarContacto exige un comentario de al menos 10 caracteres', () => {
    const errores = validarContacto({ nombre: 'Ana', correo: '', comentario: 'hola' })

    expect(errores.comentario).toBe('El comentario debe tener al menos 10 caracteres.')
  })
})
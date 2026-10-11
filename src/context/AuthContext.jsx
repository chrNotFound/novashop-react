import { createContext, useContext, useState } from 'react'
import { autenticar, crearUsuario, obtenerUsuarioPorId } from '../data/usuarios.js'

const CLAVE_SESION = 'sesionNovaShop'

const AuthContext = createContext(null)

function leerSesionGuardada() {
  try {
    const id = localStorage.getItem(CLAVE_SESION)
    return id ? obtenerUsuarioPorId(id) || null : null
  } catch (error) {
    console.error('No se pudo leer la sesión guardada:', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesionGuardada)

  const iniciarSesion = (correo, clave) => {
    const encontrado = autenticar(correo, clave)
    if (!encontrado) {
      return false
    }
    localStorage.setItem(CLAVE_SESION, String(encontrado.id))
    setUsuario(encontrado)
    return true
  }

  const registrar = (datos) => {
    const nuevo = crearUsuario({
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      correo: datos.correo,
      clave: datos.clave,
      rol: 'cliente',
    })
    localStorage.setItem(CLAVE_SESION, String(nuevo.id))
    setUsuario(nuevo)
    return nuevo
  }

  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_SESION)
    setUsuario(null)
  }

  const valor = {
    usuario,
    estaAutenticado: usuario !== null,
    esAdmin: usuario !== null && usuario.rol === 'admin',
    iniciarSesion,
    registrar,
    cerrarSesion,
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return contexto
}
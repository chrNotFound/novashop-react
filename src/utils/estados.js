export const ESTADOS = ['pagada', 'enviada', 'rechazada', 'cancelada']

export function claseEstado(estado) {
  const clases = {
    pagada: 'text-bg-success',
    enviada: 'text-bg-info',
    rechazada: 'text-bg-danger',
    cancelada: 'text-bg-secondary',
  }
  return clases[estado] || 'text-bg-light'
}
import { ApiError } from '../api/ApiError'

// Convierte cualquier error en una lista de textos para mostrar
export function mensajesDeError(error: unknown): string[] {
  if (error instanceof ApiError) {
    // 400: la lista de campos inválidos. 401 y 409: el mensaje del servidor
    return error.detalles.length > 0 ? error.detalles : [error.message]
  }
  // Si fetch falla (backend apagado, sin red) no hay ApiError
  return ['No se pudo conectar con el servidor']
}

export function mostrarMensajes(caja: HTMLElement, mensajes: string[]): void {
  caja.replaceChildren()
  for (const mensaje of mensajes) {
    const linea = document.createElement('p')
    linea.textContent = mensaje // textContent, nunca innerHTML con datos externos
    caja.appendChild(linea)
  }
}
import type { ErrorResponse } from '../types/ErrorResponse'

export class ApiError extends Error {
  status: number
  detalles: string[]

  constructor(status: number, mensaje: string, detalles: string[] = []) {
    super(mensaje)
    this.status = status
    this.detalles = detalles
  }
}

export async function errorDesdeRespuesta(respuesta: Response): Promise<ApiError> {
  // El 401 de la cadena de seguridad llega con cuerpo vacío, por eso el try/catch
  try {
    const cuerpo: ErrorResponse = await respuesta.json()
    return new ApiError(respuesta.status, cuerpo.mensaje, cuerpo.detalles ?? [])
  } catch {
    return new ApiError(respuesta.status, `Error ${respuesta.status}`)
  }
}
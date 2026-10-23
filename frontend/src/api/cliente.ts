import { cerrarSesion, obtenerToken } from '../utils/sesion'

// Igual que fetch, pero añade el token y maneja el 401 en un solo lugar
export async function fetchAutenticado(
  url: string,
  opciones: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(opciones.headers)
  const token = obtenerToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const respuesta = await fetch(url, { ...opciones, headers })

  if (respuesta.status === 401) {
    // Token vencido, manipulado o ausente: se limpia la sesión y se vuelve al login
    cerrarSesion()
    location.hash = '#/login'
  }
  return respuesta
}
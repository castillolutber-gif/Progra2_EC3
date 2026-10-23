import type { LoginRequest, LoginResponse, RegistroRequest } from '../types/Auth'
import { errorDesdeRespuesta } from './ApiError'

export async function iniciarSesion(datos: LoginRequest): Promise<LoginResponse> {
  const respuesta = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!respuesta.ok) {
    throw await errorDesdeRespuesta(respuesta)
  }
  return respuesta.json()
}

export async function registrarUsuario(datos: RegistroRequest): Promise<void> {
  const respuesta = await fetch('/api/auth/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!respuesta.ok) {
    throw await errorDesdeRespuesta(respuesta)
  }
  // El 201 no se lee: tras registrarse, el usuario inicia sesión
}
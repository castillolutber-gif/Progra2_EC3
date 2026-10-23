export type Rol = 'ESTUDIANTE' | 'ADMINISTRADOR'

export interface LoginRequest {
  correo: string
  contrasena: string
}

export interface LoginResponse {
  token: string
  nombre: string
  rol: Rol
}

export interface RegistroRequest {
  nombre: string
  apellido: string
  correo: string
  contrasena: string
}
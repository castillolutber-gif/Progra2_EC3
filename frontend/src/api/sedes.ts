import type { Sede } from '../types/Sede'

export async function obtenerSedes(): Promise<Sede[]> {
  const respuesta = await fetch('/api/sedes')
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener las sedes`)
  }
  return respuesta.json()
}
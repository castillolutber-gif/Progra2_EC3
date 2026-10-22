
import type { Categoria } from "../types/Categoria";

export async function obtenerCategorias(): Promise<Categoria[]> {
  const respuesta = await fetch("/api/categorias");
  if (!respuesta.ok) throw new Error("No se pudieron cargar las categorías");
  return respuesta.json();
}
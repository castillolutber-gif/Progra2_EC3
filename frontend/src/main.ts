import { obtenerSedes } from './api/sedes'

const app = document.querySelector<HTMLDivElement>('#app')!

async function cargarSedes() {
  const titulo = document.createElement('h1')
  titulo.textContent = 'Sedes'
  const lista = document.createElement('ul')
  app.replaceChildren(titulo, lista)

  try {
    const sedes = await obtenerSedes()
    for (const sede of sedes) {
      const item = document.createElement('li')
      item.textContent = `${sede.nombre} - ${sede.descripcion ?? ''}`
      lista.appendChild(item)
    }
  } catch (error) {
    const aviso = document.createElement('p')
    aviso.textContent = 'No se pudieron cargar las sedes.'
    app.appendChild(aviso)
    console.error(error)
  }
}

cargarSedes()
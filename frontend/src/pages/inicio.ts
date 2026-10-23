import { cerrarSesion, obtenerSesion } from '../utils/sesion'

export function mostrarInicio(contenedor: HTMLElement): void {
  const sesion = obtenerSesion()
  const barra = document.createElement('nav')
  barra.className = 'barra'

  if (sesion) {
    const saludo = document.createElement('span')
    saludo.textContent = `Hola, ${sesion.nombre} (${sesion.rol})` // el nombre lo escribió un usuario
    const salir = document.createElement('button')
    salir.textContent = 'Cerrar sesión'
    salir.addEventListener('click', () => {
      cerrarSesion()
      location.hash = '#/login'
    })
    barra.append(saludo, salir)
  } else {
    barra.innerHTML = '<a href="#/login">Iniciar sesión</a> <a href="#/registro">Registrarse</a>'
  }

  const titulo = document.createElement('h1')
  titulo.textContent = 'Publicaciones universitarias'
  contenedor.append(barra, titulo)
}
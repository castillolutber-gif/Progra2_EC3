import { iniciarSesion } from '../api/auth'
import { guardarSesion } from '../utils/sesion'
import { mensajesDeError, mostrarMensajes } from '../utils/dom'

export function mostrarLogin(contenedor: HTMLElement): void {
  contenedor.innerHTML = `
    <main class="auth">
      <h1>Iniciar sesión</h1>
      <form id="form-login" novalidate>
        <label>Correo <input name="correo" type="email"></label>
        <label>Contraseña <input name="contrasena" type="password"></label>
        <div class="errores" role="alert"></div>
        <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <a href="#/registro">Regístrate</a></p>
    </main>
  `

  const form = contenedor.querySelector<HTMLFormElement>('#form-login')!
  const errores = contenedor.querySelector<HTMLElement>('.errores')!
  const boton = form.querySelector<HTMLButtonElement>('button')!

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    mostrarMensajes(errores, [])

    const datos = new FormData(form)
    boton.disabled = true
    try {
      const sesion = await iniciarSesion({
        correo: String(datos.get('correo') ?? '').trim().toLowerCase(),
        contrasena: String(datos.get('contrasena') ?? ''),
      })
      guardarSesion(sesion)
      location.hash = '#/'
    } catch (error) {
      mostrarMensajes(errores, mensajesDeError(error)) // el 401 muestra el mensaje genérico
    } finally {
      boton.disabled = false
    }
  })
}
import { iniciarSesion, registrarUsuario } from '../api/auth'
import { guardarSesion } from '../utils/sesion'
import { mensajesDeError, mostrarMensajes } from '../utils/dom'

export function mostrarRegistro(contenedor: HTMLElement): void {
  // HTML fijo escrito por nosotros: no incluye datos de usuarios
  contenedor.innerHTML = `
    <main class="auth">
      <h1>Crear cuenta</h1>
      <form id="form-registro" novalidate>
        <label>Nombre <input name="nombre" maxlength="80"></label>
        <label>Apellido <input name="apellido" maxlength="80"></label>
        <label>Correo <input name="correo" type="email" maxlength="150"></label>
        <label>Contraseña (mínimo 8 caracteres)
          <input name="contrasena" type="password" maxlength="72">
        </label>
        <div class="errores" role="alert"></div>
        <button type="submit">Registrarme</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a></p>
    </main>
  `

  const form = contenedor.querySelector<HTMLFormElement>('#form-registro')!
  const errores = contenedor.querySelector<HTMLElement>('.errores')!
  const boton = form.querySelector<HTMLButtonElement>('button')!

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault() // evita que el navegador recargue la página
    mostrarMensajes(errores, [])

    const datos = new FormData(form)
    const correo = String(datos.get('correo') ?? '').trim().toLowerCase()
    const contrasena = String(datos.get('contrasena') ?? '')

    boton.disabled = true // evita enviar dos veces
    try {
      await registrarUsuario({
        nombre: String(datos.get('nombre') ?? '').trim(),
        apellido: String(datos.get('apellido') ?? '').trim(),
        correo,
        contrasena,
      })
      // El registro no devuelve token: iniciamos sesión con los mismos datos
      guardarSesion(await iniciarSesion({ correo, contrasena }))
      location.hash = '#/'
    } catch (error) {
      mostrarMensajes(errores, mensajesDeError(error))
    } finally {
      boton.disabled = false
    }
  })
}
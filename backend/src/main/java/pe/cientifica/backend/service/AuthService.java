package pe.cientifica.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pe.cientifica.backend.dto.RegistroRequest;
import pe.cientifica.backend.entity.Rol;
import pe.cientifica.backend.entity.Usuario;
import pe.cientifica.backend.repository.UsuarioRepository;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registrar(RegistroRequest request) {
        String correo = request.correo().trim().toLowerCase();

        if (usuarioRepository.existsByCorreo(correo)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre().trim());
        usuario.setApellido(request.apellido().trim());
        usuario.setCorreo(correo);
        usuario.setContrasena(passwordEncoder.encode(request.contrasena()));
        usuario.setRol(Rol.ESTUDIANTE); // siempre estudiante, nunca viene del cliente
        usuarioRepository.save(usuario);
    }
}
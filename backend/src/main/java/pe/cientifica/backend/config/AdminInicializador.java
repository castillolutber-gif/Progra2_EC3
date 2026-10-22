package pe.cientifica.backend.config;

import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pe.cientifica.backend.entity.Rol;
import pe.cientifica.backend.entity.Usuario;
import pe.cientifica.backend.repository.UsuarioRepository;

@Component
public class AdminInicializador implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminInicializador.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final String correo;
    private final String contrasena;
    private final String nombre;
    private final String apellido;

    public AdminInicializador(UsuarioRepository usuarioRepository,
                              PasswordEncoder passwordEncoder,
                              @Value("${app.admin.correo:}") String correo,
                              @Value("${app.admin.contrasena:}") String contrasena,
                              @Value("${app.admin.nombre:Administrador}") String nombre,
                              @Value("${app.admin.apellido:Sistema}") String apellido) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.correo = correo;
        this.contrasena = contrasena;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    @Override
    public void run(String @NonNull ... args) {
        if (correo.isBlank() || contrasena.isBlank()) {
            log.warn("No se configuró app.admin.correo / app.admin.contrasena: no se crea administrador inicial");
            return;
        }

        String correoNormalizado = correo.trim().toLowerCase();
        if (usuarioRepository.existsByCorreo(correoNormalizado)) {
            return; // ya existe, no se duplica ni se sobrescribe
        }

        Usuario admin = new Usuario();
        admin.setNombre(nombre);
        admin.setApellido(apellido);
        admin.setCorreo(correoNormalizado);
        admin.setContrasena(passwordEncoder.encode(contrasena));
        admin.setRol(Rol.ADMINISTRADOR);
        usuarioRepository.save(admin);

        log.info("Administrador inicial creado: {}", correoNormalizado);
    }
}
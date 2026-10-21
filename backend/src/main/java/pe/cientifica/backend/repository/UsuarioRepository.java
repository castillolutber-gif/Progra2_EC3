package pe.cientifica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cientifica.backend.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
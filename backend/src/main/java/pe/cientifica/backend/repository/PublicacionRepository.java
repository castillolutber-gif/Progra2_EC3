package pe.cientifica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cientifica.backend.entity.Publicacion;

public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
}
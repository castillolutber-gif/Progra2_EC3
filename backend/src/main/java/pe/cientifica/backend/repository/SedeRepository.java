package pe.cientifica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cientifica.backend.entity.Sede;

public interface SedeRepository extends JpaRepository<Sede, Integer> {
}
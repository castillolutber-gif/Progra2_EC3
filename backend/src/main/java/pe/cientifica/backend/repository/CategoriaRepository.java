package pe.cientifica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cientifica.backend.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}
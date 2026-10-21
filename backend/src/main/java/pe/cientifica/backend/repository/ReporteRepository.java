package pe.cientifica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cientifica.backend.entity.Reporte;

public interface ReporteRepository extends JpaRepository<Reporte, Integer> {
}
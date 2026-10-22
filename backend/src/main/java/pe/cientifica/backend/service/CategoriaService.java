package pe.cientifica.backend.service;

import org.springframework.stereotype.Service;
import pe.cientifica.backend.dto.CategoriaResponse;
import pe.cientifica.backend.repository.CategoriaRepository;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream()
                .map(c -> new CategoriaResponse(c.getId(), c.getNombre()))
                .toList();
    }
}
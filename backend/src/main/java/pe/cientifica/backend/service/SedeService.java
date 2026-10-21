package pe.cientifica.backend.service;

import org.springframework.stereotype.Service;
import pe.cientifica.backend.dto.SedeResponse;
import pe.cientifica.backend.repository.SedeRepository;

import java.util.List;

@Service
public class SedeService {

    private final SedeRepository sedeRepository;

    public SedeService(SedeRepository sedeRepository) {
        this.sedeRepository = sedeRepository;
    }

    public List<SedeResponse> listar() {
        return sedeRepository.findAll().stream()
                .map(s -> new SedeResponse(s.getId(), s.getNombre(), s.getDescripcion()))
                .toList();
    }
}
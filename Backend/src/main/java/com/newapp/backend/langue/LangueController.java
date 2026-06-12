package com.newapp.backend.langue;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newapp.backend.langue.LangueDtos.CreerLangue;
import com.newapp.backend.langue.LangueDtos.LangueDto;
import com.newapp.backend.langue.LangueDtos.MajLangue;

/**
 * CRUD des langues du Kanban (libellés + couleurs par statut, par langue).
 *
 * GET    /api/langues        → toutes les langues avec leurs 3 statuts
 * POST   /api/langues        → crée une langue (code + nom) + 3 statuts par défaut
 * PUT    /api/langues/{id}   → met à jour nom + libellés/couleurs des statuts
 * DELETE /api/langues/{id}   → supprime une langue et ses statuts
 */
@RestController
@RequestMapping("/api/langues")
public class LangueController {

    private final LangueService service;

    public LangueController(LangueService service) {
        this.service = service;
    }

    @GetMapping
    public List<LangueDto> getAll() {
        return service.getAll();
    }

    @PostMapping
    public LangueDto creer(@RequestBody CreerLangue corps) {
        return service.creer(corps);
    }

    @PutMapping("/{id}")
    public LangueDto mettreAJour(@PathVariable Long id, @RequestBody MajLangue corps) {
        return service.mettreAJour(id, corps);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Long id) {
        service.supprimer(id);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }
}

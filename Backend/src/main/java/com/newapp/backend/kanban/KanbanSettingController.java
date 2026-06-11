package com.newapp.backend.kanban;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * API JSON des réglages du tableau Kanban.
 *
 * GET  /api/kanban/settings        → les 3 colonnes (couleur, labels fr/mg)
 * PUT  /api/kanban/settings        → met à jour une ou plusieurs colonnes
 * POST /api/kanban/settings/reset  → restaure les valeurs par défaut
 */
@RestController
@RequestMapping("/api/kanban/settings")
public class KanbanSettingController {

    private final KanbanSettingService service;

    public KanbanSettingController(KanbanSettingService service) {
        this.service = service;
    }

    @GetMapping
    public List<KanbanSetting> getSettings() {
        return service.getAll();
    }

    @PutMapping
    public List<KanbanSetting> updateSettings(@RequestBody List<KanbanSettingUpdate> updates) {
        return service.updateAll(updates);
    }

    @PostMapping("/reset")
    public List<KanbanSetting> resetSettings() {
        return service.resetToDefaults();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }
}

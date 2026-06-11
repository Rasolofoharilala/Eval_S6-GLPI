package com.newapp.backend.kanban;

/** Corps JSON attendu pour la mise à jour d'une colonne Kanban. */
public record KanbanSettingUpdate(String statusKey, String labelFr, String labelMg, String color) {
}

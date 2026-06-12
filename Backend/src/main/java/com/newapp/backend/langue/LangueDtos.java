package com.newapp.backend.langue;

import java.util.List;

/**
 * Objets JSON échangés avec le front pour le CRUD des langues.
 * Regroupés ici pour rester simple (un seul fichier de DTOs).
 */
public final class LangueDtos {

    private LangueDtos() {
    }

    /** Un statut d'une langue tel qu'affiché/édité (libellé + couleur). */
    public record StatutDto(String statusKey, Integer position, String label, String color) {
    }

    /** Une langue complète avec ses 3 statuts (réponse GET). */
    public record LangueDto(Long id, String code, String nom, List<StatutDto> statuts) {
    }

    /** Corps pour CRÉER une langue : code + nom (les 3 statuts sont créés par défaut). */
    public record CreerLangue(String code, String nom) {
    }

    /** Corps pour METTRE À JOUR une langue : nom + libellés/couleurs des statuts. */
    public record MajLangue(String nom, List<StatutDto> statuts) {
    }
}

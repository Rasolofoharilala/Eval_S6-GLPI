package com.newapp.backend.langue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Une langue d'affichage du Kanban (ex : Français, Malgache, Anglais).
 * Chaque langue possède ses propres libellés et couleurs par statut
 * (voir l'entité StatutLangue).
 */
@Entity
@Table(name = "langue")
public class Langue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Code court de la langue : fr | mg | en … (unique) */
    @Column(nullable = false, unique = true)
    private String code;

    /** Nom affiché de la langue : Français, Malgache… */
    @Column(nullable = false)
    private String nom;

    public Langue() {
    }

    public Langue(String code, String nom) {
        this.code = code;
        this.nom = nom;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}

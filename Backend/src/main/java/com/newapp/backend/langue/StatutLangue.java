package com.newapp.backend.langue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Libellé + couleur d'UN statut pour UNE langue.
 *
 * Il y a 3 statuts fixes (nouveau, in_progress, termine). Chaque langue a donc
 * 3 lignes StatutLangue : ainsi la couleur peut être identique pour tous les
 * statuts, différente par statut, ou différente d'une langue à l'autre — tout
 * est paramétrable.
 */
@Entity
@Table(name = "statut_langue")
public class StatutLangue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** À quelle langue appartient cette ligne (id de la langue). */
    @Column(name = "langue_id", nullable = false)
    private Long langueId;

    /** Clé du statut : nouveau | in_progress | termine */
    @Column(name = "status_key", nullable = false)
    private String statusKey;

    /** Ordre d'affichage (1..3) */
    @Column(nullable = false)
    private Integer position;

    /** Libellé du statut dans cette langue (ex : Vaovao, New, Nouveau) */
    @Column(nullable = false)
    private String label;

    /** Couleur de fond, format #RRGGBB */
    @Column(nullable = false)
    private String color;

    public StatutLangue() {
    }

    public StatutLangue(Long langueId, String statusKey, Integer position, String label, String color) {
        this.langueId = langueId;
        this.statusKey = statusKey;
        this.position = position;
        this.label = label;
        this.color = color;
    }

    public Long getId() {
        return id;
    }

    public Long getLangueId() {
        return langueId;
    }

    public void setLangueId(Long langueId) {
        this.langueId = langueId;
    }

    public String getStatusKey() {
        return statusKey;
    }

    public void setStatusKey(String statusKey) {
        this.statusKey = statusKey;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}

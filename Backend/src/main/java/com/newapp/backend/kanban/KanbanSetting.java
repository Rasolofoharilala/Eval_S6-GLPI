package com.newapp.backend.kanban;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Réglage d'une colonne du tableau Kanban :
 * couleur de fond + libellé français + version malgache du statut.
 */
@Entity
@Table(name = "kanban_settings")
public class KanbanSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Clé technique de la colonne : nouveau | in_progress | termine */
    @Column(name = "status_key", nullable = false, unique = true)
    private String statusKey;

    /** Ordre d'affichage de la colonne (1..3) */
    @Column(nullable = false)
    private Integer position;

    @Column(name = "label_fr", nullable = false)
    private String labelFr;

    /** Version malgache du nom de statut (ex : vaovao, efa manao, vita) */
    @Column(name = "label_mg", nullable = false)
    private String labelMg;

    /** Couleur de fond de la colonne, format hexadécimal #RRGGBB */
    @Column(nullable = false)
    private String color;

    public KanbanSetting() {
    }

    public KanbanSetting(String statusKey, Integer position, String labelFr, String labelMg, String color) {
        this.statusKey = statusKey;
        this.position = position;
        this.labelFr = labelFr;
        this.labelMg = labelMg;
        this.color = color;
    }

    public Long getId() {
        return id;
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

    public String getLabelFr() {
        return labelFr;
    }

    public void setLabelFr(String labelFr) {
        this.labelFr = labelFr;
    }

    public String getLabelMg() {
        return labelMg;
    }

    public void setLabelMg(String labelMg) {
        this.labelMg = labelMg;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}

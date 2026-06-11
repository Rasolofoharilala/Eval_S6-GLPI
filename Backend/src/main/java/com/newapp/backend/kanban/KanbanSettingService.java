package com.newapp.backend.kanban;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class KanbanSettingService {

    private static final Pattern HEX_COLOR = Pattern.compile("^#[0-9a-fA-F]{6}$");

    private final KanbanSettingRepository repository;

    public KanbanSettingService(KanbanSettingRepository repository) {
        this.repository = repository;
    }

    /** Valeurs par défaut conformes au sujet : vaovao / efa manao / vita. */
    private static List<KanbanSetting> defaults() {
        return List.of(
                new KanbanSetting("nouveau", 1, "Nouveau", "Vaovao", "#dbeafe"),
                new KanbanSetting("in_progress", 2, "In progress", "Efa manao", "#ffedd5"),
                new KanbanSetting("termine", 3, "Terminé", "Vita", "#dcfce7"));
    }

    /** Insère les 3 colonnes au premier démarrage si la table est vide. */
    public void seedIfEmpty() {
        if (repository.count() == 0) {
            repository.saveAll(defaults());
        }
    }

    public List<KanbanSetting> getAll() {
        return repository.findAllByOrderByPositionAsc();
    }

    @Transactional
    public List<KanbanSetting> updateAll(List<KanbanSettingUpdate> updates) {
        for (KanbanSettingUpdate update : updates) {
            KanbanSetting setting = repository.findByStatusKey(update.statusKey())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Statut inconnu : " + update.statusKey()));

            if (update.color() != null) {
                if (!HEX_COLOR.matcher(update.color()).matches()) {
                    throw new IllegalArgumentException(
                            "Couleur invalide (#RRGGBB attendu) : " + update.color());
                }
                setting.setColor(update.color());
            }
            if (update.labelFr() != null && !update.labelFr().isBlank()) {
                setting.setLabelFr(update.labelFr().trim());
            }
            if (update.labelMg() != null && !update.labelMg().isBlank()) {
                setting.setLabelMg(update.labelMg().trim());
            }

            repository.save(setting);
        }

        return getAll();
    }

    /** Restaure couleurs et libellés d'origine. */
    @Transactional
    public List<KanbanSetting> resetToDefaults() {
        // deleteAllInBatch execute le DELETE immediatement : sans cela Hibernate
        // reordonne les INSERT avant le DELETE et viole la contrainte unique.
        repository.deleteAllInBatch();
        repository.saveAll(defaults());
        return getAll();
    }
}

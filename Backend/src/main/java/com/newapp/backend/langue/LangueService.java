package com.newapp.backend.langue;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newapp.backend.langue.LangueDtos.CreerLangue;
import com.newapp.backend.langue.LangueDtos.LangueDto;
import com.newapp.backend.langue.LangueDtos.MajLangue;
import com.newapp.backend.langue.LangueDtos.StatutDto;

/**
 * CRUD des langues du Kanban.
 *
 * Une langue possède toujours 3 statuts (nouveau, in_progress, termine).
 * À la création d'une langue, ses 3 lignes de statut sont générées avec des
 * libellés et couleurs par défaut, puis modifiables ensuite.
 */
@Service
public class LangueService {

    private static final Pattern HEX_COLOR = Pattern.compile("^#[0-9a-fA-F]{6}$");

    // Les 3 statuts fixes, dans l'ordre d'affichage.
    private static final String[] STATUS_KEYS = { "nouveau", "in_progress", "termine" };
    private static final String[] LABELS_DEFAUT = { "Nouveau", "In progress", "Terminé" };
    private static final String[] COULEURS_DEFAUT = { "#dbeafe", "#ffedd5", "#dcfce7" };

    private final LangueRepository langueRepository;
    private final StatutLangueRepository statutRepository;

    public LangueService(LangueRepository langueRepository, StatutLangueRepository statutRepository) {
        this.langueRepository = langueRepository;
        this.statutRepository = statutRepository;
    }

    /** Au premier démarrage : crée Français et Malgache si aucune langue n'existe. */
    @Transactional
    public void seedIfEmpty() {
        if (langueRepository.count() > 0) {
            return;
        }
        creerLangueAvecLabels("fr", "Français",
                new String[] { "Nouveau", "In progress", "Terminé" });
        creerLangueAvecLabels("mg", "Malgache",
                new String[] { "Vaovao", "Efa manao", "Vita" });
    }

    /** Liste toutes les langues avec leurs 3 statuts. */
    public List<LangueDto> getAll() {
        List<LangueDto> resultat = new ArrayList<>();
        for (Langue langue : langueRepository.findAll()) {
            resultat.add(versDto(langue));
        }
        return resultat;
    }

    /** Crée une nouvelle langue + ses 3 statuts par défaut. */
    @Transactional
    public LangueDto creer(CreerLangue corps) {
        String code = corps.code() == null ? "" : corps.code().trim().toLowerCase();
        String nom = corps.nom() == null ? "" : corps.nom().trim();

        if (code.isEmpty() || nom.isEmpty()) {
            throw new IllegalArgumentException("Le code et le nom sont obligatoires.");
        }
        if (langueRepository.existsByCode(code)) {
            throw new IllegalArgumentException("Ce code de langue existe déjà : " + code);
        }

        Langue langue = creerLangueAvecLabels(code, nom, LABELS_DEFAUT);
        return versDto(langue);
    }

    /** Met à jour le nom de la langue et les libellés/couleurs de ses statuts. */
    @Transactional
    public LangueDto mettreAJour(Long id, MajLangue corps) {
        Langue langue = langueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Langue introuvable : " + id));

        if (corps.nom() != null && !corps.nom().isBlank()) {
            langue.setNom(corps.nom().trim());
            langueRepository.save(langue);
        }

        List<StatutLangue> statuts = statutRepository.findByLangueIdOrderByPositionAsc(id);
        if (corps.statuts() != null) {
            for (StatutDto maj : corps.statuts()) {
                StatutLangue cible = trouverParStatusKey(statuts, maj.statusKey());
                if (cible == null) {
                    continue;
                }
                if (maj.label() != null && !maj.label().isBlank()) {
                    cible.setLabel(maj.label().trim());
                }
                if (maj.color() != null) {
                    if (!HEX_COLOR.matcher(maj.color()).matches()) {
                        throw new IllegalArgumentException(
                                "Couleur invalide (#RRGGBB attendu) : " + maj.color());
                    }
                    cible.setColor(maj.color());
                }
                statutRepository.save(cible);
            }
        }

        return versDto(langue);
    }

    /** Supprime une langue et ses 3 statuts. */
    @Transactional
    public void supprimer(Long id) {
        if (!langueRepository.existsById(id)) {
            throw new IllegalArgumentException("Langue introuvable : " + id);
        }
        statutRepository.deleteByLangueId(id);
        langueRepository.deleteById(id);
    }

    // ─── Aides internes ───────────────────────────────────────────────────────

    private Langue creerLangueAvecLabels(String code, String nom, String[] labels) {
        Langue langue = langueRepository.save(new Langue(code, nom));
        for (int i = 0; i < STATUS_KEYS.length; i++) {
            statutRepository.save(new StatutLangue(
                    langue.getId(), STATUS_KEYS[i], i + 1, labels[i], COULEURS_DEFAUT[i]));
        }
        return langue;
    }

    private StatutLangue trouverParStatusKey(List<StatutLangue> statuts, String statusKey) {
        for (StatutLangue s : statuts) {
            if (s.getStatusKey().equals(statusKey)) {
                return s;
            }
        }
        return null;
    }

    private LangueDto versDto(Langue langue) {
        List<StatutDto> statuts = new ArrayList<>();
        for (StatutLangue s : statutRepository.findByLangueIdOrderByPositionAsc(langue.getId())) {
            statuts.add(new StatutDto(s.getStatusKey(), s.getPosition(), s.getLabel(), s.getColor()));
        }
        return new LangueDto(langue.getId(), langue.getCode(), langue.getNom(), statuts);
    }
}

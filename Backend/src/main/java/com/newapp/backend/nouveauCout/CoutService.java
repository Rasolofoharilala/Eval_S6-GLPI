package com.newapp.backend.nouveauCout;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newapp.backend.nouveauCout.CoutDTO.CreerCout;
import com.newapp.backend.nouveauCout.CoutDTO.CoutCree;
import com.newapp.backend.nouveauCout.CoutDTO.CoutParItem;
import com.newapp.backend.nouveauCout.CoutDTO.ItemLie;
import com.newapp.backend.nouveauCout.CoutDTO.Reouverture;

@Service
public class CoutService {

    private final CoutRepository repository;

    public CoutService(CoutRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public List<CoutCree> creer(CreerCout corps) {
        if (corps == null || corps.ticketId() == null || corps.ticketId() <= 0) {
            throw new IllegalArgumentException("L'identifiant du ticket est obligatoire.");
        }
        if (corps.nouveauCout() == null || corps.nouveauCout().signum() < 0) {
            throw new IllegalArgumentException("Le nouveau coût doit être un nombre positif ou nul.");
        }
        if (corps.items() == null || corps.items().isEmpty()) {
            throw new IllegalArgumentException("Le ticket doit avoir au moins un item lié.");
        }

        BigDecimal coutParItem = corps.nouveauCout()
                .divide(BigDecimal.valueOf(corps.items().size()), 4, RoundingMode.HALF_UP);

        List<Cout> couts = new ArrayList<>();
        for (ItemLie item : corps.items()) {
            if (item == null || item.itemId() == null || item.itemId() <= 0
                    || item.itemType() == null || item.itemType().isBlank()) {
                throw new IllegalArgumentException("Chaque item doit avoir un id et un type valides.");
            }
            couts.add(new Cout(
                    corps.ticketId(),
                    item.itemId(),
                    item.itemType().trim(),
                    coutParItem));
        }

        return repository.saveAll(couts).stream()
                .map(this::versDto)
                .toList();
    }

    public List<CoutCree> getByTicketId(Integer ticketId) {
        return repository.findByTicketId(ticketId).stream()
                .map(this::versDto)
                .toList();
    }

    /** Coûts ACTIFS d'un ticket (annule = false). */
    public List<CoutCree> getActifsByTicketId(Integer ticketId) {
        return repository.findByTicketIdAndAnnuleFalse(ticketId).stream()
                .map(this::versDto)
                .toList();
    }

    /**
     * Dernier coût TOTAL actif d'un ticket = somme des lignes actives du
     * dernier lot inséré (les lignes-enfants d'un même ajout partagent l'ordre
     * d'insertion). Sert au calcul du pourcentage de réouverture.
     */
    public BigDecimal dernierCoutTotalActif(Integer ticketId) {
        List<Cout> actifs = repository.findByTicketIdAndAnnuleFalseOrderByIdDesc(ticketId);
        if (actifs.isEmpty()) {
            return BigDecimal.ZERO;
        }
        // Les lignes du dernier ajout se suivent : on additionne celles qui
        // ont le même item_type/ticket que la plus récente ET sont contiguës.
        // Simplement : on additionne TOUTES les lignes actives du ticket
        // (un ticket n'a qu'un lot actif à la fois après annulation des anciens).
        BigDecimal total = BigDecimal.ZERO;
        for (Cout c : actifs) {
            total = total.add(c.getCout());
        }
        return total;
    }

    /**
     * RÉOUVERTURE (Terminé → In progress) avec un pourcentage :
     *   nouvelle valeur = dernière valeur + (pourcentage % × dernière valeur).
     * On annule le(s) coût(s) actif(s) du ticket, puis on réinsère la nouvelle
     * valeur répartie sur les items. Renvoie les lignes créées.
     */
    @Transactional
    public List<CoutCree> reouvrir(Reouverture corps) {
        if (corps == null || corps.ticketId() == null || corps.ticketId() <= 0) {
            throw new IllegalArgumentException("L'identifiant du ticket est obligatoire.");
        }
        if (corps.pourcentage() == null || corps.pourcentage().signum() < 0) {
            throw new IllegalArgumentException("Le pourcentage doit être positif ou nul.");
        }
        if (corps.items() == null || corps.items().isEmpty()) {
            throw new IllegalArgumentException("Le ticket doit avoir au moins un item lié.");
        }

        BigDecimal derniere = dernierCoutTotalActif(corps.ticketId());

        // nouvelle = derniere + derniere × (pourcentage / 100)
        BigDecimal facteur = corps.pourcentage().divide(BigDecimal.valueOf(100), 6, RoundingMode.HALF_UP);
        BigDecimal nouvelle = derniere.add(derniere.multiply(facteur));

        // Annuler les coûts actifs existants (gardés en historique).
        annulerActifs(corps.ticketId());

        // Réinsérer la nouvelle valeur répartie sur les items.
        BigDecimal coutParItem = nouvelle.divide(
                BigDecimal.valueOf(corps.items().size()), 4, RoundingMode.HALF_UP);
        List<Cout> couts = new ArrayList<>();
        for (ItemLie item : corps.items()) {
            couts.add(new Cout(corps.ticketId(), item.itemId(), item.itemType().trim(), coutParItem));
        }
        return repository.saveAll(couts).stream().map(this::versDto).toList();
    }

    /**
     * ANNULATION simple : marque annulés tous les coûts actifs du ticket
     * (l'utilisateur a choisi « Annuler » sans réinsérer de coût).
     */
    @Transactional
    public void annulerActifs(Integer ticketId) {
        List<Cout> actifs = repository.findByTicketIdAndAnnuleFalse(ticketId);
        for (Cout c : actifs) {
            c.setAnnule(true);
        }
        repository.saveAll(actifs);
    }

    /** Supprime physiquement tous les coûts d'un ticket. */
    @Transactional
    public void supprimerByTicketId(Integer ticketId) {
        if (ticketId == null || ticketId <= 0) {
            throw new IllegalArgumentException("L'identifiant du ticket est obligatoire.");
        }
        repository.deleteAll(repository.findByTicketId(ticketId));
    }

    /** Tous les coûts ACTIFS (annulés exclus) — utilisé par /coutsParc. */
    public List<CoutCree> getAll() {
        return repository.findByAnnuleFalse().stream()
                .map(this::versDto)
                .toList();
    }

    /** Tous les coûts y compris annulés (historique complet). */
    public List<CoutCree> getAllAvecAnnules() {
        return repository.findAll().stream()
                .map(this::versDto)
                .toList();
    }

    /** Vide la table des nouveaux coûts (appelé à la réinitialisation). */
    @Transactional
    public void supprimerTout() {
        repository.deleteAllInBatch();
    }

    public List<CoutParItem> getCoutsParItem() {
        Map<String, CoutParItem> totaux = new LinkedHashMap<>();

        for (Cout cout : repository.findByAnnuleFalse()) {
            String cle = cout.getItemType() + ":" + cout.getItemId();
            CoutParItem existant = totaux.get(cle);
            BigDecimal total = cout.getCout();
            if (existant != null) {
                total = existant.cout().add(cout.getCout());
            }
            totaux.put(cle, new CoutParItem(
                    cout.getItemId(),
                    cout.getItemType(),
                    total));
        }

        return new ArrayList<>(totaux.values());
    }

    private CoutCree versDto(Cout cout) {
        return new CoutCree(
                cout.getId(),
                cout.getTicketId(),
                cout.getItemId(),
                cout.getItemType(),
                cout.getCout(),
                cout.isAnnule());
    }
}

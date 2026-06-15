package com.newapp.backend.nouveauCout;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CoutRepository extends JpaRepository<Cout, Long> {

    /** Tous les coûts d'un ticket (annulés inclus). */
    List<Cout> findByTicketId(Integer ticketId);

    /** Coûts ACTIFS d'un ticket (annule = false). */
    List<Cout> findByTicketIdAndAnnuleFalse(Integer ticketId);

    /** Tous les coûts actifs (pour les totaux). */
    List<Cout> findByAnnuleFalse();

    /** Dernières lignes d'un ticket (id décroissant) pour retrouver le dernier coût inséré. */
    List<Cout> findByTicketIdOrderByIdDesc(Integer ticketId);

    /** Lignes actives d'un ticket, plus récentes d'abord. */
    List<Cout> findByTicketIdAndAnnuleFalseOrderByIdDesc(Integer ticketId);
}

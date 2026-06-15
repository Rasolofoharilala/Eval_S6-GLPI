package com.newapp.backend.nouveauCout;

import java.math.BigDecimal;
import java.util.List;

public final class CoutDTO {
    private CoutDTO() {
    }

    public record ItemLie(Integer itemId, String itemType) {
    }

    public record CreerCout(Integer ticketId, BigDecimal nouveauCout, List<ItemLie> items) {
    }

    /** Réouverture : on majore la dernière valeur du ticket de `pourcentage` %. */
    public record Reouverture(Integer ticketId, BigDecimal pourcentage, List<ItemLie> items) {
    }

    public record CoutCree(
            Long id,
            Integer ticketId,
            Integer itemId,
            String itemType,
            BigDecimal cout,
            boolean annule) {
    }

    public record CoutParItem(
            Integer itemId,
            String itemType,
            BigDecimal cout) {
    }
}

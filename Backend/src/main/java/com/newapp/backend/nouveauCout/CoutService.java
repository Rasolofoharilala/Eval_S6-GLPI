package com.newapp.backend.nouveauCout;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newapp.backend.nouveauCout.CoutDTO.CreerCout;
import com.newapp.backend.nouveauCout.CoutDTO.CoutCree;
import com.newapp.backend.nouveauCout.CoutDTO.ItemLie;

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

    private CoutCree versDto(Cout cout) {
        return new CoutCree(
                cout.getId(),
                cout.getTicketId(),
                cout.getItemId(),
                cout.getItemType(),
                cout.getCout());
    }
}

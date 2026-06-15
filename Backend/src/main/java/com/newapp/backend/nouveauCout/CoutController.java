package com.newapp.backend.nouveauCout;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newapp.backend.nouveauCout.CoutDTO.CreerCout;
import com.newapp.backend.nouveauCout.CoutDTO.CoutCree;
import com.newapp.backend.nouveauCout.CoutDTO.CoutParItem;
import com.newapp.backend.nouveauCout.CoutDTO.Reouverture;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/couts")
public class CoutController {

    private final CoutService service;

    public CoutController(CoutService service) {
        this.service = service;
    }

    @PostMapping
    public List<CoutCree> creer(@RequestBody CreerCout corps) {
        return service.creer(corps);
    }

    @GetMapping("/ticket/{ticketId}")
    public List<CoutCree> getByTicketId(@PathVariable Integer ticketId) {
        return service.getByTicketId(ticketId);
    }

    @GetMapping
    public List<CoutCree> getAll() {
        return service.getAll();
    }

    @GetMapping("/items")
    public List<CoutParItem> getCoutsParItem() {
        return service.getCoutsParItem();
    }

    /** Vide la table des nouveaux coûts (réinitialisation). */
    @DeleteMapping
    public void supprimerTout() {
        service.supprimerTout();
    }

    /** Coûts ACTIFS d'un ticket (annulés exclus). */
    @GetMapping("/ticket/{ticketId}/actifs")
    public List<CoutCree> getActifsByTicketId(@PathVariable Integer ticketId) {
        return service.getActifsByTicketId(ticketId);
    }

    /** Dernier coût total actif d'un ticket (base du calcul de réouverture). */
    @GetMapping("/ticket/{ticketId}/dernier")
    public Map<String, BigDecimal> dernierCoutActif(@PathVariable Integer ticketId) {
        return Map.of("dernierCout", service.dernierCoutTotalActif(ticketId));
    }

    /**
     * RÉOUVERTURE (Terminé → In progress) : majore la dernière valeur de X %,
     * annule les coûts actifs et réinsère la nouvelle valeur.
     */
    @PostMapping("/reouverture")
    public List<CoutCree> reouvrir(@RequestBody Reouverture corps) {
        return service.reouvrir(corps);
    }

    /** Annule (sans réinsérer) les coûts actifs d'un ticket. */
    @PostMapping("/ticket/{ticketId}/annuler")
    public void annuler(@PathVariable Integer ticketId) {
        service.annulerActifs(ticketId);
    }

    /** Supprime physiquement tous les coûts d'un ticket. */
    @DeleteMapping("/ticket/{ticketId}")
    public void supprimerTicket(@PathVariable Integer ticketId) {
        service.supprimerByTicketId(ticketId);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }
}

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

    // @DeleteMapping("/idTicketsDelete/{id}")
    // public void supprimerById(@RequestBody Integer id){
    //     service.supprimerById(id);
    // }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        return "Delete by id called";
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }
}

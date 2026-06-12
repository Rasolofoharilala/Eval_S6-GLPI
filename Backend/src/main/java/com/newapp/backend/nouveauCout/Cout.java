package com.newapp.backend.nouveauCout;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nouveau_cout")
public class Cout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_id", nullable = false)
    private Integer ticketId;

    @Column(name = "item_id", nullable = false)
    private Integer itemId;

    @Column(name = "item_type", nullable = false)
    private String itemType;

    @Column(name = "cout", nullable = false, precision = 19, scale = 4)
    private BigDecimal cout;

    protected Cout() {
    }

    public Cout(Integer ticketId, Integer itemId, String itemType, BigDecimal cout) {
        this.ticketId = ticketId;
        this.itemId = itemId;
        this.itemType = itemType;
        this.cout = cout;
    }

    public BigDecimal getCout() {
        return cout;
    }

    public Long getId() {
        return id;
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public String getItemType() {
        return itemType;
    }
}

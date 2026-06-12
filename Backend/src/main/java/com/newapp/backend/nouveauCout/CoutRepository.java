package com.newapp.backend.nouveauCout;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CoutRepository extends JpaRepository<Cout, Long> {
    List<Cout> findByTicketId(Integer ticketId);
}

package com.newapp.backend.langue;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LangueRepository extends JpaRepository<Langue, Long> {

    Optional<Langue> findByCode(String code);

    boolean existsByCode(String code);
}

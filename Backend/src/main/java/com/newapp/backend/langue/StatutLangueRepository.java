package com.newapp.backend.langue;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StatutLangueRepository extends JpaRepository<StatutLangue, Long> {

    List<StatutLangue> findByLangueIdOrderByPositionAsc(Long langueId);

    void deleteByLangueId(Long langueId);
}

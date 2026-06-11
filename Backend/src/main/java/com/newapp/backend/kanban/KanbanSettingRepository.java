package com.newapp.backend.kanban;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface KanbanSettingRepository extends JpaRepository<KanbanSetting, Long> {

    List<KanbanSetting> findAllByOrderByPositionAsc();

    Optional<KanbanSetting> findByStatusKey(String statusKey);
}

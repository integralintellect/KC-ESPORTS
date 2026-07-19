package com.kcesports.repository;

import com.kcesports.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRepository
        extends JpaRepository<Achievement, Long> {

    List<Achievement> findAllByOrderByDisplayOrderAsc();
}
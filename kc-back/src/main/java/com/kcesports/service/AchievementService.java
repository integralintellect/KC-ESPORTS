package com.kcesports.service;

import com.kcesports.entity.Achievement;
import com.kcesports.repository.AchievementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Achievement createAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    public void deleteAchievement(Long id) {
        Achievement achievement =
                achievementRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Achievement not found"
                                )
                        );

        achievementRepository.delete(achievement);
    }
}
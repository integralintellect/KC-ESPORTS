package com.kcesports.controller;

import com.kcesports.entity.Achievement;
import com.kcesports.service.AchievementService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        return ResponseEntity.ok(achievementService
                .getAllAchievements()
        );
    }

    @PostMapping
    public ResponseEntity<Achievement> createAchievement(
            @RequestBody Achievement achievement
    ) {
        return ResponseEntity.ok(
                achievementService
                        .createAchievement(
                                achievement
                        )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(
            @PathVariable Long id
    ) {
        achievementService.deleteAchievement(id);

        return ResponseEntity.noContent().build();
    }
}
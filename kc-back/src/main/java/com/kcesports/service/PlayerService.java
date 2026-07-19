package com.kcesports.service;

import com.kcesports.entity.Player;
import com.kcesports.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final CloudinaryService cloudinaryService;

    public PlayerService(
            PlayerRepository playerRepository,
            CloudinaryService cloudinaryService
    ) {
        this.playerRepository = playerRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAllByOrderByDisplayOverAsc();
    }

    public Player getPlayerById(Long playerId) {
        return playerRepository.findById(playerId)
                .orElseThrow(() ->
                        new RuntimeException("Player with id: " + playerId + " not found!"));
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(Long id, Player updatedPlayer) {

        Player existingPlayer = playerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Player with id: " + id + " not found!")
                );

        String oldImagePublicId = existingPlayer.getImagePublicId();
        String newImagePublicId = updatedPlayer.getImagePublicId();


        existingPlayer.setName(updatedPlayer.getName());
        existingPlayer.setIgn(updatedPlayer.getIgn());
        existingPlayer.setRole(updatedPlayer.getRole());
        existingPlayer.setUid(updatedPlayer.getUid());
        existingPlayer.setImageUrl(updatedPlayer.getImageUrl());
        existingPlayer.setImagePublicId(updatedPlayer.getImagePublicId());
        existingPlayer.setInstagram(updatedPlayer.getInstagram());
        existingPlayer.setDisplayOver(updatedPlayer.getDisplayOver());

        Player savedPlayer = playerRepository.save(existingPlayer);

        if(oldImagePublicId != null && !oldImagePublicId.isBlank() && newImagePublicId != null && !oldImagePublicId.equals(newImagePublicId)){
            try {
                cloudinaryService.deleteImage(oldImagePublicId);
            }
            catch (Exception e) {
                System.err.println("Failed to delete gallery image: " + oldImagePublicId);
            }
        }
        return savedPlayer;
    }

    public void deletePlayer(Long id) {
        Player player = getPlayerById(id);

        try {
            cloudinaryService.deleteImage(player.getImagePublicId());
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to delete player image", e);
        }

        playerRepository.delete(player);
    }
}

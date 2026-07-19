package com.kcesports.controller;

import com.kcesports.dto.ImageUploadResponse;
import com.kcesports.service.CloudinaryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {

    private final CloudinaryService cloudinaryService;

    public ImageUploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/player")
    public ResponseEntity<ImageUploadResponse> uploadPlayerImage(
            @RequestParam("image")
            MultipartFile image
    ) throws IOException {

        return ResponseEntity.ok(
                cloudinaryService.uploadImage(
                        image,
                        "kc-esports/players"
                )
        );
    }

    @PostMapping("/gallery")
    public ResponseEntity<ImageUploadResponse> uploadGalleryImage(
            @RequestParam("image")
            MultipartFile image
    ) throws IOException {

        return ResponseEntity.ok(
                cloudinaryService.uploadImage(
                        image,
                        "kc-esports/gallery"
                )
        );
    }
}
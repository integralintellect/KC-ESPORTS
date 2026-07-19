package com.kcesports.controller;

import com.kcesports.entity.GalleryItem;
import com.kcesports.service.GalleryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(
            GalleryService galleryService
    ) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public ResponseEntity<List<GalleryItem>>
    getAllItems() {

        return ResponseEntity.ok(
                galleryService.getAllItems()
        );
    }

    @PostMapping
    public ResponseEntity<GalleryItem> createItem(
            @RequestBody GalleryItem item
    ) {

        return ResponseEntity.ok(
                galleryService.createItem(item)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(
            @PathVariable Long id
    ) {

        galleryService.deleteItem(id);

        return ResponseEntity.noContent().build();
    }
}
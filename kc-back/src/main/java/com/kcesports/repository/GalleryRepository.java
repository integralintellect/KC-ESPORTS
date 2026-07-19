package com.kcesports.repository;

import com.kcesports.entity.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryRepository extends JpaRepository<GalleryItem, Long> {

    List<GalleryItem> findAllByFeaturedTrue();
    List<GalleryItem> findAllByOrderByDisplayOrderAsc();
}
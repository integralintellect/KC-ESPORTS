package com.kcesports.service;

import com.kcesports.entity.GalleryItem;
import com.kcesports.repository.GalleryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final CloudinaryService cloudinaryService;

    public GalleryService(
            GalleryRepository galleryRepository,
            CloudinaryService cloudinaryService
    ) {
        this.galleryRepository = galleryRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<GalleryItem> getAllItems() {
        return galleryRepository.findAllByOrderByDisplayOrderAsc();
    }

    public GalleryItem createItem(GalleryItem item) {

        if (item.isFeatured()) {
            List<GalleryItem> featuredItems = galleryRepository.findAllByFeaturedTrue();

            for (GalleryItem featuredItem : featuredItems) {

                featuredItem.setFeatured(false);

                galleryRepository.save(featuredItem);
            }
        }

        return galleryRepository.save(item);
    }

    public void deleteItem(Long id) {

        GalleryItem item = galleryRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Gallery item not found"
                        )
                );

        try {
            cloudinaryService.deleteImage(item.getImagePublicId());
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to delete gallery image", e);
        }

        galleryRepository.delete(item);
    }
}
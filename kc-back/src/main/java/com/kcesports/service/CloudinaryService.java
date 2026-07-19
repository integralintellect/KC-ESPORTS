package com.kcesports.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.kcesports.dto.ImageUploadResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public ImageUploadResponse uploadImage(
            MultipartFile file,
            String folder
    ) throws IOException {

        validateImage(file);

        Map<?, ?> uploadResult =
                cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap(
                                "folder", folder,
                                "resource_type", "image"
                        )
                );

        String imageUrl = uploadResult.get("secure_url").toString();

        String publicId = uploadResult.get("public_id").toString();

        return new ImageUploadResponse(imageUrl, publicId);
    }

    public void deleteImage(String publicId) throws IOException {
        if (publicId == null || publicId.isBlank()) {
            return;
        }

        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Please select an image."
            );
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException(
                    "Only image files are allowed."
            );
        }
    }
}
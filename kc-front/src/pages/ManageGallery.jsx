import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ImagePlus,
  Trash2,
} from "lucide-react";

import api from "../api/api";

function ManageGallery() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] =
    useState(null);
  const [previewUrl, setPreviewUrl] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] = useState("");

  const fetchGallery = async () => {
    try {
      const response =
        await api.get("/gallery");

      setItems(response.data);
    } catch (error) {
      console.error(
        "Failed to load gallery:",
        error
      );
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);

    setPreviewUrl(
      URL.createObjectURL(file)
    );

    setError("");
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      setError("Add a caption first.");
      return;
    }

    if (!selectedImage) {
      setError("Choose an image first.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Upload image
      const imageData = new FormData();

      imageData.append(
        "image",
        selectedImage
      );

      const uploadResponse =
        await api.post(
          "/upload/gallery",
          imageData
        );

      // Save gallery item
      await api.post("/gallery", {
        title,
        imageUrl:
          uploadResponse.data.imageUrl,
        imagePublicId:
            uploadResponse.data.publicId,
        featured,
        displayOrder:
          items.length + 1,
      });

      setTitle("");
      setSelectedImage(null);
      setPreviewUrl("");
      setFeatured(false);

      await fetchGallery();

    } catch (error) {
      console.error(
        "Failed to add gallery image:",
        error
      );

      setError(
        "Failed to upload image."
      );

    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Remove this image from the gallery?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/gallery/${id}`
      );

      setItems((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {
      console.error(
        "Failed to delete image:",
        error
      );
    }
  };

  return (
    <main className="min-h-svh bg-kc-bg pb-12">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-kc-border bg-kc-bg/80 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4">

          <button
            type="button"
            onClick={() =>
              navigate("/admin")
            }
            className="flex h-10 w-10 items-center justify-center border border-kc-border text-kc-muted"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="font-heading text-[16px] font-bold uppercase text-kc-white">
              Manage Gallery
            </h1>

            <p className="mt-0.5 font-heading text-[8px] tracking-[0.2em] text-kc-blue">
              SQUAD MEMORIES
            </p>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-md px-5 pt-7">

        {/* Upload */}
        <div className="border border-kc-border bg-kc-card p-4">

          <div className="flex items-center gap-2">
            <ImagePlus
              size={18}
              className="text-kc-blue"
            />

            <h2 className="font-heading text-[15px] font-bold uppercase text-kc-white">
              Add Memory
            </h2>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-4 overflow-hidden border border-kc-border">
              <img
                src={previewUrl}
                alt="Preview"
                className="aspect-video w-full object-cover"
              />
            </div>
          )}

          {/* Image Picker */}
          <label className="mt-4 flex h-12 cursor-pointer items-center justify-center border border-dashed border-kc-blue/40 bg-kc-blue/5 font-heading text-[10px] tracking-[0.15em] text-kc-blue">
            {selectedImage
              ? "CHANGE IMAGE"
              : "CHOOSE IMAGE"}

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="hidden"
            />
          </label>

          {/* Caption */}
          <input
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            placeholder="Caption — Tournament Night"
            className="mt-4 h-12 w-full border border-kc-border bg-kc-bg px-4 text-[12px] text-kc-white outline-none focus:border-kc-blue"
          />

          {/* Featured */}
          <label className="mt-4 flex items-center justify-between border border-kc-border px-4 py-3">

            <div>
              <p className="font-heading text-[10px] font-semibold text-kc-white">
                FEATURED IMAGE
              </p>

              <p className="mt-1 text-[9px] text-kc-muted">
                Display this image larger.
              </p>
            </div>

            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(
                  event.target.checked
                )
              }
              className="h-4 w-4 accent-current"
            />

          </label>

          {error && (
            <p className="mt-4 text-center text-[10px] text-red-400">
              {error}
            </p>
          )}

          {/* Upload Button */}
          <button
            type="button"
            disabled={uploading}
            onClick={handleUpload}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 bg-kc-blue font-heading text-[10px] font-bold tracking-[0.15em] text-kc-bg disabled:opacity-50"
          >
            <ImagePlus size={16} />

            {uploading
              ? "UPLOADING..."
              : "ADD TO GALLERY"}
          </button>

        </div>

        {/* Existing Gallery */}
        <div className="mt-9">

          <div className="flex items-center justify-between">
            <h2 className="font-heading text-[18px] font-bold uppercase text-kc-white">
              Gallery
            </h2>

            <span className="font-heading text-[9px] text-kc-muted">
              {items.length} IMAGES
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">

            {items.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden border border-kc-border"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />

                {item.featured && (
                  <span className="absolute left-2 top-2 bg-kc-blue px-2 py-1 font-heading text-[7px] font-bold text-kc-bg">
                    FEATURED
                  </span>
                )}

                <p className="absolute bottom-3 left-3 right-10 truncate font-heading text-[10px] font-semibold text-white">
                  {item.title}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      item.id
                    )
                  }
                  className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center bg-kc-bg/80 text-red-400 backdrop-blur"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}

          </div>
        </div>

      </div>
    </main>
  );
}

export default ManageGallery;
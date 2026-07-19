import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  UserRound,
} from "lucide-react";

import api from "../api/api";

function EditPlayer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    ign: "",
    role: "",
    uid: "",
    imageUrl: "",
    imagePublicId: "",
    instagram: "",
    displayOrder: "",
  });

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);

    const preview = URL.createObjectURL(file);

    setPreviewUrl(preview);
  };

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await api.get(
          `/players/${id}`
        );

        const player = response.data;

        setFormData({
          name: player.name || "",
          ign: player.ign || "",
          role: player.role || "",
          uid: player.uid || "",
          imageUrl: player.imageUrl || "",
          imagePublicId: player.imagePublicId || "",
          instagram: player.instagram || "",
          displayOrder:
            player.displayOrder?.toString() || "",
        });
      } catch (error) {
        console.error(
          "Failed to fetch player:",
          error
        );

        setError("Failed to load player.");
      } finally {
        setFetching(false);
      }
    };

    fetchPlayer();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.ign.trim() ||
      !formData.uid.trim()
    ) {
      setError(
        "Name, IGN and UID are required."
      );
      return;
    }

    try {
        setSaving(true);
        setError("");

        // Keep the current image by default
        let imageUrl = formData.imageUrl;
        let imagePublicId = formData.imagePublicId;

        // Upload only if a new image was selected
        if (selectedImage) {
            const imageData = new FormData();

            imageData.append(
            "image",
            selectedImage
            );

            const uploadResponse = await api.post(
            "/upload/player",
            imageData
            );

            imageUrl = uploadResponse.data.imageUrl;
            imagePublicId = uploadResponse.data.publicId;
        }

        // Update player
        await api.put(`/players/${id}`, {
            ...formData,

            imageUrl,
            imagePublicId,

            displayOrder: formData.displayOrder
            ? Number(formData.displayOrder)
            : 1,
        });

        navigate("/admin/players");

    }
    catch (error) {
        console.error(
            "Failed to update player:",
            error
        );

        setError(
            "Failed to update player. Please try again."
        );

    } finally {
        setSaving(false);
    }
  };

  const inputClass =
    "mt-2 h-12 w-full border border-kc-border bg-kc-card px-4 text-[13px] text-kc-white outline-none transition-colors focus:border-kc-blue placeholder:text-kc-muted/40";

  const labelClass =
    "font-heading text-[9px] tracking-[0.2em] text-kc-muted";

  if (fetching) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-kc-bg">
        <p className="font-heading text-[10px] tracking-[0.2em] text-kc-muted">
          LOADING PLAYER...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-kc-bg pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-kc-border bg-kc-bg/80 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/players")
            }
            className="flex h-10 w-10 items-center justify-center border border-kc-border text-kc-muted"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="font-heading text-[16px] font-bold uppercase text-kc-white">
              Edit Player
            </h1>

            <p className="mt-0.5 font-heading text-[8px] tracking-[0.2em] text-kc-blue">
              UPDATE SQUAD MEMBER
            </p>
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md px-5 pt-7"
      >
        {/* Current Player */}
        <div className="mb-8 flex items-center gap-4 border border-kc-border bg-kc-card p-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-kc-surface">
            {previewUrl || formData.imageUrl ? (
                <img
                    src={previewUrl || formData.imageUrl}
                    alt={formData.ign}
                    className="h-full w-full object-cover"
                />
            ) : (
                <UserRound
                    size={25}
                    strokeWidth={1}
                    className="text-kc-muted"
                />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-heading text-[18px] font-bold uppercase text-kc-white">
              {formData.ign || "PLAYER"}
            </p>

            <p className="mt-1 text-[10px] text-kc-muted">
              {formData.name}
            </p>
          </div>
        </div>

        {/* Real Name */}
        <div>
          <label className={labelClass}>
            REAL NAME *
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* IGN */}
        <div className="mt-5">
          <label className={labelClass}>
            IN-GAME NAME (IGN) *
          </label>

          <input
            name="ign"
            value={formData.ign}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Role */}
        <div className="mt-5">
          <label className={labelClass}>
            ROLE
          </label>

          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Rusher"
            className={inputClass}
          />
        </div>

        {/* UID */}
        <div className="mt-5">
          <label className={labelClass}>
            FREE FIRE UID *
          </label>

          <input
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            inputMode="numeric"
            className={inputClass}
          />
        </div>

        {/* Instagram */}
        <div className="mt-5">
          <label className={labelClass}>
            INSTAGRAM
          </label>

          <input
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram profile URL"
            className={inputClass}
          />
        </div>

        {/* Image */}
        <div className="mt-5">
        <label className={labelClass}>
            PLAYER PHOTO
        </label>

        {/* Large Photo Preview */}
        {(previewUrl || formData.imageUrl) && (
            <div className="relative mt-3 overflow-hidden border border-kc-border bg-kc-card">
            <img
                src={previewUrl || formData.imageUrl}
                alt="Player preview"
                className="h-64 w-full object-cover"
            />

            {selectedImage && (
                <div className="absolute bottom-0 left-0 right-0 bg-kc-bg/80 px-3 py-2 backdrop-blur-md">
                <p className="truncate text-center font-heading text-[8px] tracking-[0.15em] text-kc-blue">
                    NEW PHOTO SELECTED
                </p>
                </div>
            )}
            </div>
        )}

        {/* Choose Photo */}
        <label className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center border border-dashed border-kc-blue/40 bg-kc-blue/5 font-heading text-[10px] font-semibold tracking-[0.15em] text-kc-blue active:bg-kc-blue/10">
            {previewUrl || formData.imageUrl
            ? "CHANGE PHOTO"
            : "CHOOSE PHOTO"}

            <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            />
        </label>

        {selectedImage && (
            <p className="mt-2 truncate text-center text-[9px] text-kc-muted">
            {selectedImage.name}
            </p>
        )}
        </div>

        {/* Display Order */}
        <div className="mt-5">
          <label className={labelClass}>
            DISPLAY ORDER
          </label>

          <input
            type="number"
            min="1"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            className={inputClass}
          />

          <p className="mt-2 text-[9px] leading-4 text-kc-muted">
            Lower numbers appear first on the public squad carousel.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-center text-[11px] text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Save */}
        <button
          type="submit"
          disabled={saving}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 bg-kc-blue font-heading text-[11px] font-bold tracking-[0.15em] text-kc-bg active:scale-[0.98] disabled:opacity-50"
        >
          <Save size={17} />

          {saving
            ? "SAVING CHANGES..."
            : "SAVE CHANGES"}
        </button>
      </form>
    </main>
  );
}

export default EditPlayer;
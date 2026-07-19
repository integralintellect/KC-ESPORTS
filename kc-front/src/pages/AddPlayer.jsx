import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";

import api from "../api/api";

function AddPlayer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ign: "",
    role: "",
    uid: "",
    imageUrl: "",
    instagram: "",
    displayOrder: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if(!file) return;

    setSelectedImage(file);

    const preview = URL.createObjectURL(file);

    setPreviewUrl(preview);
  };

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
      setError("Name, IGN and UID are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let imageUrl = "";
      let imagePublicId = "";

      if(selectedImage) {
        const imageData = new FormData();

        imageData.append("image", selectedImage);

        const uploadResponse = await api.post("/upload/player", imageData);

        imageUrl = uploadResponse.data.imageUrl;
        imagePublicId = uploadResponse.data.publicId;
      }

      await api.post("/players", {
        ...formData,
        imageUrl,
        imagePublicId,

        displayOrder: formData.displayOrder
          ? Number(formData.displayOrder)
          : 1,
      });

      navigate("/admin/players");

    } catch (error) {
      console.error("Failed to add player:", error);

      setError("Failed to add player. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 h-12 w-full border border-kc-border bg-kc-card px-4 text-[13px] text-kc-white outline-none focus:border-kc-blue placeholder:text-kc-muted/40";

  const labelClass =
    "font-heading text-[9px] tracking-[0.2em] text-kc-muted";

  return (
    <main className="min-h-svh bg-kc-bg pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-kc-border bg-kc-bg/80 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => navigate("/admin/players")}
            className="flex h-10 w-10 items-center justify-center border border-kc-border text-kc-muted"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="font-heading text-[16px] font-bold uppercase text-kc-white">
              Add Player
            </h1>

            <p className="mt-0.5 font-heading text-[8px] tracking-[0.2em] text-kc-blue">
              NEW SQUAD MEMBER
            </p>
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md px-5 pt-7"
      >
        <div>
          <label className={labelClass}>
            REAL NAME *
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Aditya"
            className={inputClass}
          />
        </div>

        <div className="mt-5">
          <label className={labelClass}>
            IN-GAME NAME (IGN) *
          </label>

          <input
            name="ign"
            value={formData.ign}
            onChange={handleChange}
            placeholder="KC THORS"
            className={inputClass}
          />
        </div>

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

        <div className="mt-5">
          <label className={labelClass}>
            FREE FIRE UID *
          </label>

          <input
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            placeholder="123456789"
            inputMode="numeric"
            className={inputClass}
          />
        </div>

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

        <div className="mt-5">
        <label className={labelClass}>
            PLAYER PHOTO
        </label>

        {previewUrl && (
            <div className="mt-3 overflow-hidden border border-kc-border">
            <img
                src={previewUrl}
                alt="Player preview"
                className="h-64 w-full object-cover"
            />
            </div>
        )}

        <label className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center border border-dashed border-kc-blue/40 bg-kc-blue/5 font-heading text-[10px] font-semibold tracking-[0.15em] text-kc-blue">
            {selectedImage
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
            <p className="mt-2 truncate text-[9px] text-kc-muted">
            {selectedImage.name}
            </p>
        )}
        </div>

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
            placeholder="1"
            className={inputClass}
          />
        </div>

        {error && (
          <div className="mt-5 border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-center text-[11px] text-red-400">
              {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 bg-kc-blue font-heading text-[11px] font-bold tracking-[0.15em] text-kc-bg active:scale-[0.98] disabled:opacity-50"
        >
          <UserPlus size={17} />

          {loading ? "ADDING PLAYER..." : "ADD TO SQUAD"}
        </button>
      </form>
    </main>
  );
}

export default AddPlayer;
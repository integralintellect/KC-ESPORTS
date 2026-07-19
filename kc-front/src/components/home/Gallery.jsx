import { Image, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../api/api";

function Gallery() {

  const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await api.get("/gallery");

                const data = response.data;

                // Put featured images first
                const sorted = [...data].sort(
                    (a, b) => Number(b.featured) - Number(a.featured)
                );

                setGalleryItems(sorted);

            } catch (error) {
                console.error(
                    "Failed to load gallery:",
                    error
                );
            }
        };

        fetchGallery();
    }, []);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-kc-surface py-20"
    >
      {/* Background Glow */}
      <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-kc-blue/5 blur-[120px]" />

      <div className="relative mx-auto max-w-md px-5">
        {/* Section Label */}
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-7 bg-kc-blue" />

          <p className="font-heading text-[11px] font-semibold tracking-[0.3em] text-kc-blue">
            GALLERY
          </p>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-[42px] font-bold uppercase leading-[0.9] text-kc-white">
          From The
          <br />
          <span className="text-kc-blue">Battlefield.</span>
        </h2>

        <p className="mt-4 max-w-82.5 text-[13px] leading-6 text-kc-muted">
          Wins, fails, chaos and everything in between. Some moments are
          just too good to disappear from the group chat.
        </p>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-2 gap-2">
            {galleryItems.map(
                (item, index) => (
                <div
                    key={item.id}
                    className={`relative overflow-hidden border border-kc-border bg-kc-card ${
                    index === 0
                        ? "col-span-2 aspect-video"
                        : "aspect-square"
                    }`}
                >
                    <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-3">
                    <p className="font-heading text-[12px] font-bold uppercase tracking-wider text-kc-white">
                        {item.title}
                    </p>
                    </div>
                </div>
                )
            )}
        </div>

        {/* Future Gallery Message */}
        <div className="mt-5 flex items-center justify-center gap-2 border border-kc-border py-3">
          <Plus size={14} className="text-kc-blue" />

          <span className="font-heading text-[10px] tracking-[0.15em] text-kc-muted">
            MORE MEMORIES COMING SOON
          </span>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
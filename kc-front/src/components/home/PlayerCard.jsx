import { Gamepad2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

function PlayerCard({ player, number }) {
  return (
    <article className="group relative overflow-hidden border border-kc-border bg-kc-card">

      {/* Player Image */}
      <div className="relative h-97.5 overflow-hidden bg-kc-surface">
        {player.imageUrl ? (
          <img
            src={player.imageUrl}
            alt={player.ign}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Gamepad2
              size={65}
              strokeWidth={1}
              className="text-kc-border"
            />

            <span className="mt-3 font-heading text-[10px] tracking-[0.2em] text-kc-muted">
              PLAYER IMAGE
            </span>
          </div>
        )}

        {/* Image Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-kc-card via-transparent to-transparent" />

        {/* Player Number */}
        <span className="absolute right-4 top-4 font-heading text-[11px] font-bold tracking-widest text-white/30">
          0{number}
        </span>

        {/* Role */}
        <span className="absolute left-4 top-4 border border-kc-blue/30 bg-kc-bg/80 px-3 py-1.5 font-heading text-[10px] font-bold tracking-[0.2em] text-kc-blue backdrop-blur-md">
          {player.role}
        </span>
      </div>

      {/* Player Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">

          <div>
            {/* IGN */}
            <h3 className="font-heading text-[30px] font-bold uppercase leading-none tracking-wide text-kc-white">
              {player.ign}
            </h3>

            {/* Real Name */}
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-kc-muted">
              {player.name}
            </p>
          </div>

          {/* Instagram */}
          {player.instagram && (
            <a
              href={player.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${player.ign} Instagram`}
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-kc-border text-kc-muted transition-colors active:border-kc-blue active:text-kc-blue"
            >
              <FaInstagram size={18} />
            </a>
          )}
        </div>

        {/* UID */}
        <div className="mt-5 flex items-center justify-between border-t border-kc-border pt-4">
          <span className="text-[9px] uppercase tracking-[0.2em] text-kc-muted">
            FREE FIRE UID
          </span>

          <span className="font-heading text-[14px] font-semibold tracking-wider text-kc-white">
            {player.uid}
          </span>
        </div>
      </div>

    </article>
  );
}

export default PlayerCard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";

import api from "../api/api";

function ManagePlayers() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchPlayers = async () => {
    try {
      const response = await api.get("/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Failed to fetch players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this player?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`/players/${id}`);

      setPlayers((prev) =>
        prev.filter((player) => player.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete player:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-svh bg-kc-bg pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-kc-border bg-kc-bg/80 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex h-10 w-10 items-center justify-center border border-kc-border text-kc-muted"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="font-heading text-[16px] font-bold uppercase text-kc-white">
              Manage Players
            </h1>

            <p className="mt-0.5 font-heading text-[8px] tracking-[0.2em] text-kc-blue">
              KC ESPORTS SQUAD
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-md px-5 pt-7">
        {/* Top */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-[9px] tracking-[0.2em] text-kc-blue">
              THE SQUAD
            </p>

            <h2 className="mt-2 font-heading text-[30px] font-bold uppercase leading-none text-kc-white">
              Players
            </h2>

            <p className="mt-2 text-[11px] text-kc-muted">
              {players.length} players in the squad
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/players/add")}
            className="flex h-11 items-center gap-2 bg-kc-blue px-4 font-heading text-[10px] font-bold tracking-widest text-kc-bg active:scale-95"
          >
            <Plus size={16} />
            ADD PLAYER
          </button>
        </div>

        {/* Player List */}
        <div className="mt-7 space-y-3">
          {loading ? (
            <p className="py-12 text-center font-heading text-[10px] tracking-[0.2em] text-kc-muted">
              LOADING SQUAD...
            </p>
          ) : players.length === 0 ? (
            <div className="border border-dashed border-kc-border px-5 py-12 text-center">
              <UserRound
                size={32}
                strokeWidth={1}
                className="mx-auto text-kc-muted"
              />

              <h3 className="mt-4 font-heading text-[17px] font-bold uppercase text-kc-white">
                No Players Yet
              </h3>

              <p className="mt-2 text-[11px] text-kc-muted">
                Add the first KC ESPORTS player.
              </p>
            </div>
          ) : (
            players.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center gap-3 border border-kc-border bg-kc-card p-3"
              >
                {/* Image */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-kc-surface">
                  {player.imageUrl ? (
                    <img
                      src={player.imageUrl}
                      alt={player.ign}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={24}
                      strokeWidth={1}
                      className="text-kc-muted"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-[8px] text-kc-blue">
                      0{index + 1}
                    </span>

                    <h3 className="truncate font-heading text-[16px] font-bold uppercase text-kc-white">
                      {player.ign}
                    </h3>
                  </div>

                  <p className="mt-1 truncate text-[10px] text-kc-muted">
                    {player.name}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="border border-kc-blue/20 bg-kc-blue/5 px-2 py-1 font-heading text-[8px] uppercase tracking-wider text-kc-blue">
                      {player.role || "PLAYER"}
                    </span>

                    <span className="truncate text-[8px] text-kc-muted">
                      UID: {player.uid}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col gap-2">
                {/* Edit */}
                <button
                    type="button"
                    onClick={() =>
                    navigate(`/admin/players/${player.id}/edit`)
                    }
                    className="flex h-9 w-9 items-center justify-center border border-kc-border text-kc-muted transition-colors active:border-kc-blue active:text-kc-blue"
                    aria-label={`Edit ${player.ign}`}
                >
                    <Pencil size={14} />
                </button>

                {/* Delete */}
                <button
                    type="button"
                    disabled={deletingId === player.id}
                    onClick={() => handleDelete(player.id)}
                    className="flex h-9 w-9 items-center justify-center border border-kc-border text-kc-muted transition-colors active:border-red-500/50 active:text-red-400 disabled:opacity-40"
                    aria-label={`Delete ${player.ign}`}
                >
                    <Trash2 size={14} />
                </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default ManagePlayers;
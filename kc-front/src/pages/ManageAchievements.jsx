import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Trophy,
} from "lucide-react";

import api from "../api/api";

function ManageAchievements() {
  const navigate = useNavigate();

  const [achievements, setAchievements] =
    useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tournament: "",
    position: "",
    year: "",
  });

  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const fetchAchievements = async () => {
    try {
      const response =
        await api.get("/achievements");

      setAchievements(response.data);
    } catch (error) {
      console.error(
        "Failed to load achievements:",
        error
      );
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError(
        "Achievement title is required."
      );
      return;
    }

    try {
      setAdding(true);
      setError("");

      await api.post("/achievements", {
        ...formData,

        year: formData.year
          ? Number(formData.year)
          : null,

        displayOrder:
          achievements.length + 1,
      });

      setFormData({
        title: "",
        description: "",
        tournament: "",
        position: "",
        year: "",
      });

      await fetchAchievements();

    } catch (error) {

      console.error(
        "Failed to add achievement:",
        error
      );

      setError(
        "Failed to add achievement."
      );

    } finally {

      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this achievement?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/achievements/${id}`
      );

      setAchievements((prev) =>
        prev.filter(
          (achievement) =>
            achievement.id !== id
        )
      );

    } catch (error) {
      console.error(
        "Failed to delete achievement:",
        error
      );
    }
  };

  const inputClass =
    "mt-2 h-12 w-full border border-kc-border bg-kc-bg px-4 text-[12px] text-kc-white outline-none focus:border-kc-blue placeholder:text-kc-muted/40";

  const labelClass =
    "font-heading text-[9px] tracking-[0.2em] text-kc-muted";

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
              Achievements
            </h1>

            <p className="mt-0.5 font-heading text-[8px] tracking-[0.2em] text-kc-blue">
              TROPHY CABINET
            </p>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-md px-5 pt-7">

        {/* Add Achievement */}
        <form
          onSubmit={handleAdd}
          className="border border-kc-border bg-kc-card p-4"
        >

          <div className="flex items-center gap-2">
            <Trophy
              size={18}
              className="text-kc-blue"
            />

            <h2 className="font-heading text-[15px] font-bold uppercase text-kc-white">
              Add Achievement
            </h2>
          </div>

          <div className="mt-5">
            <label className={labelClass}>
              TITLE *
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Champions"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>
              TOURNAMENT
            </label>

            <input
              name="tournament"
              value={formData.tournament}
              onChange={handleChange}
              placeholder="Tournament name"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>
              POSITION
            </label>

            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="1st Place"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>
              YEAR
            </label>

            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="2026"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>
              DESCRIPTION
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell the story..."
              rows={4}
              className="mt-2 w-full resize-none border border-kc-border bg-kc-bg p-4 text-[12px] text-kc-white outline-none focus:border-kc-blue"
            />
          </div>

          {error && (
            <p className="mt-4 text-center text-[10px] text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={adding}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 bg-kc-blue font-heading text-[10px] font-bold tracking-[0.15em] text-kc-bg disabled:opacity-50"
          >
            <Plus size={16} />

            {adding
              ? "ADDING..."
              : "ADD ACHIEVEMENT"}
          </button>

        </form>

        {/* Existing Achievements */}
        <div className="mt-9">

          <div className="flex items-center justify-between">

            <h2 className="font-heading text-[18px] font-bold uppercase text-kc-white">
              Trophy Cabinet
            </h2>

            <span className="font-heading text-[9px] text-kc-muted">
              {achievements.length}
            </span>

          </div>

          {achievements.length === 0 ? (

            <div className="mt-4 border border-dashed border-kc-border py-10 text-center">

              <Trophy
                size={28}
                strokeWidth={1}
                className="mx-auto text-kc-muted"
              />

              <p className="mt-4 font-heading text-[14px] font-bold uppercase text-kc-white">
                Cabinet Empty
              </p>

              <p className="mt-2 text-[10px] text-kc-muted">
                We're working on it. Probably.
              </p>

            </div>

          ) : (

            <div className="mt-4 space-y-3">

              {achievements.map(
                (achievement) => (

                  <div
                    key={achievement.id}
                    className="flex items-start gap-3 border border-kc-border bg-kc-card p-4"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-kc-blue/10 text-kc-blue">
                      <Trophy size={17} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="font-heading text-[14px] font-bold uppercase text-kc-white">
                        {achievement.title}
                      </h3>

                      {achievement.tournament && (
                        <p className="mt-1 text-[10px] text-kc-muted">
                          {achievement.tournament}
                        </p>
                      )}

                      <div className="mt-2 flex gap-2">

                        {achievement.position && (
                          <span className="font-heading text-[8px] text-kc-blue">
                            {achievement.position}
                          </span>
                        )}

                        {achievement.year && (
                          <span className="font-heading text-[8px] text-kc-muted">
                            {achievement.year}
                          </span>
                        )}

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          achievement.id
                        )
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-kc-border text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>
                )
              )}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}

export default ManageAchievements;
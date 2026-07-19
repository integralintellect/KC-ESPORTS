import {
  Crosshair,
  Crown,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import Reveal from "../ui/Reveal";
import api from "../../api/api";

function Achievements() {
  // Funny achievements shown until real achievements are added
  const funnyAchievements = [
    {
      icon: Trophy,
      title: "Professional Lobby Creators",
      description: "CHAMPIONSHIP PENDING.",
    },
    {
      icon: Crosshair,
      title: "Certified Rush Experts",
      description: "RUSH FIRST, THINK LATER.",
    },
    {
      icon: Users,
      title: "5-Man Squad",
      description:
        "OUR GREATEST ACHIEVEMENT: SOMEHOW STILL BEING FRIENDS.",
    },
    {
      icon: Crown,
      title: "Major Trophies",
      description: "0... FOR NOW.",
    },
  ];

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await api.get(
          "/achievements"
        );

        setAchievements(response.data);
      } catch (error) {
        console.error(
          "Failed to load achievements:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-kc-bg py-20"
    >
      {/* Background Glow */}
      <div className="absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-kc-blue/5 blur-[120px]" />

      <div className="relative mx-auto max-w-md px-5">
        <Reveal>
          {/* Section Label */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-kc-blue" />

            <p className="font-heading text-[11px] font-semibold tracking-[0.3em] text-kc-blue">
              ACHIEVEMENTS
            </p>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-[42px] font-bold uppercase leading-[0.9] text-kc-white">
            OUR TROPHY
            <br />

            <span className="text-kc-blue">
              CABINET.
            </span>
          </h2>
        </Reveal>

        {/* Loading */}
        {loading ? (
          <div className="mt-10 py-10 text-center">
            <p className="font-heading text-[10px] tracking-[0.2em] text-kc-muted">
              CHECKING THE TROPHY CABINET...
            </p>
          </div>
        ) : achievements.length > 0 ? (
          <>
            {/* Real Achievements */}
            <div className="mt-8 space-y-3">
              {achievements.map(
                (achievement, index) => (
                  <Reveal
                    key={achievement.id}
                    delay={index * 0.07}
                    className="border border-kc-border bg-kc-card p-4"
                  >
                    <div className="flex items-start gap-4">
                      {/* Trophy Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-kc-blue/20 bg-kc-blue/5 text-kc-blue">
                        <Trophy
                          size={21}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Achievement Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {/* Position */}
                            {achievement.position && (
                              <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.2em] text-kc-blue">
                                {achievement.position}
                              </p>
                            )}

                            {/* Title */}
                            <h3 className="mt-1 font-heading text-[15px] font-bold uppercase tracking-wide text-kc-white">
                              {achievement.title}
                            </h3>
                          </div>

                          {/* Year */}
                          {achievement.year && (
                            <span className="shrink-0 font-heading text-[9px] text-kc-blue">
                              {achievement.year}
                            </span>
                          )}
                        </div>

                        {/* Tournament */}
                        {achievement.tournament && (
                          <p className="mt-2 font-heading text-[9px] uppercase tracking-widest text-kc-muted">
                            {achievement.tournament}
                          </p>
                        )}

                        {/* Description */}
                        {achievement.description && (
                          <p className="mt-2 text-[11px] leading-5 text-kc-muted">
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                )
              )}
            </div>

            {/* Real Achievement Bottom Message */}
            <Reveal>
              <div className="mt-8 border border-dashed border-kc-blue/30 bg-kc-blue/5 px-5 py-5 text-center">
                <Trophy
                  size={24}
                  strokeWidth={1.5}
                  className="mx-auto text-kc-blue"
                />

                <p className="mt-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-kc-white">
                  The cabinet is no longer empty.
                </p>

                <p className="mt-1 font-heading text-[12px] uppercase tracking-widest text-kc-blue">
                  More loading...
                </p>
              </div>
            </Reveal>
          </>
        ) : (
          <>
            {/* Funny Placeholder Achievements */}
            <div className="mt-8 space-y-3">
              {funnyAchievements.map(
                (achievement, index) => {
                  const Icon = achievement.icon;

                  return (
                    <Reveal
                      key={achievement.title}
                      delay={index * 0.07}
                      className="flex items-center gap-4 border border-kc-border bg-kc-card p-4"
                    >
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-kc-blue/20 bg-kc-blue/5 text-kc-blue">
                        <Icon
                          size={21}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-[15px] font-bold uppercase tracking-wide text-kc-white">
                          {achievement.title}
                        </h3>

                        <p className="mt-1 text-[11px] leading-5 text-kc-muted">
                          {achievement.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                }
              )}
            </div>

            {/* Funny Bottom Message */}
            <Reveal>
              <div className="mt-8 border border-dashed border-kc-blue/30 bg-kc-blue/5 px-5 py-5 text-center">
                <Trophy
                  size={24}
                  strokeWidth={1.5}
                  className="mx-auto text-kc-blue"
                />

                <p className="mt-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-kc-white">
                  The trophy cabinet is empty.
                </p>

                <p className="mt-1 font-heading text-[12px] uppercase tracking-widest text-kc-blue">
                  The confidence is not.
                </p>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}

export default Achievements;
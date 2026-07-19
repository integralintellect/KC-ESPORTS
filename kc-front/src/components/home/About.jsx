import { Gamepad2, MapPin, Users } from "lucide-react";
import Reveal from "../ui/Reveal";

function About() {
  const details = [
    {
      icon: MapPin,
      label: "HOME",
      value: "Khas Chowmuhani",
    },
    {
      icon: Users,
      label: "SQUAD",
      value: "5 Friends",
    },
    {
      icon: Gamepad2,
      label: "GAME",
      value: "Free Fire",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-kc-surface py-20"
    >
      {/* Background Glow */}
      <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-kc-blue/5 blur-[120px]" />

      <div className="relative mx-auto max-w-md px-5">
        {/* Section Label */}
        <Reveal>
            <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-kc-blue" />

            <p className="font-heading text-[11px] font-semibold tracking-[0.3em] text-kc-blue">
                THE SHARK DEN
            </p>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-[42px] font-bold uppercase leading-[0.9] text-kc-white">
            More Than
            <br />
            Just A <span className="text-kc-blue">Team.</span>
            </h2>
        </Reveal>

        {/* Story */}
        <Reveal delay={0.1}>
            <div className="mt-7">
            <p className="text-[13px] leading-6 text-kc-muted">
                KC ESPORTS started in Khas Chowmuhani with five friends who
                shared one thing in common — a love for Free Fire.
            </p>

            <p className="mt-4 text-[13px] leading-6 text-kc-muted">
                What started as playing together for fun became our squad.
                We play, compete, improve and make memories together while
                representing the place where it all started.
            </p>
            </div>
        </Reveal>

        {/* Quote */}
        <Reveal delay={0.15} direction="right">
            <div className="mt-7 border-l-2 border-kc-blue bg-kc-blue/5 px-4 py-4">
                <p className="font-heading text-lg font-semibold tracking-wide text-kc-white">
                "Five friends. One village. One squad."
                </p>
            </div>
        </Reveal>

        {/* Team Details */}
        <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-3 border border-kc-border bg-kc-card">
            {details.map((detail, index) => {
                const Icon = detail.icon;

                return (
                <div
                    key={detail.label}
                    className={`flex min-w-0 flex-col items-center px-2 py-5 text-center ${
                    index !== details.length - 1
                        ? "border-r border-kc-border"
                        : ""
                    }`}
                >
                    <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-kc-blue"
                    />

                    <p className="mt-3 font-heading text-[9px] tracking-[0.2em] text-kc-muted">
                    {detail.label}
                    </p>

                    <p className="mt-1 max-w-full wrap-break-word font-heading text-[12px] font-bold leading-4 text-kc-white">
                    {detail.value}
                    </p>
                </div>
                );
            })}
            </div>
        </Reveal>

        {/* Bottom Identity */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-kc-border" />

          <span className="font-heading text-[9px] tracking-[0.25em] text-kc-muted">
            EST. BY FRIENDSHIP
          </span>

          <span className="h-px flex-1 bg-kc-border" />
        </div>
      </div>
    </section>
  );
}

export default About;
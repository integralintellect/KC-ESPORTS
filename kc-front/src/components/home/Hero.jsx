import logo from "../../assets/kc_png.png";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-50 items-center overflow-hidden bg-kc-bg pt-16"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-[35%] h-72 w-72 -translate-x-1/2 rounded-full bg-kc-blue/10 blur-[100px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-5 pb-8 pt-5 text-center">

        {/* Location */}
        <motion.div
            initial={{opacity: 0, y: -15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="flex items-center gap-3"
        >
          <span className="h-px w-6 bg-kc-blue" />

          <p className="font-heading text-[11px] font-semibold tracking-[0.3em] text-kc-blue">
            KHAS CHOWMUHANI
          </p>

          <span className="h-px w-6 bg-kc-blue" />
        </motion.div>

        {/* Logo + Heading */}
        <div className="mt-8 flex w-full items-center justify-center gap-2">

          {/* Logo */}
          <motion.div
            initial={{opacity: 0, x: -30, scale: 0.9}}
            animate={{opacity: 1, x: 0, scale: 1}}
            transition={{
                duration: 0.7,
                delay: 0.2,
                ease: "easeOut",
            }}
            className="relative flex w-[55%] items-center justify-center"
           >
            <div className="absolute h-40 w-40 rounded-full bg-kc-blue/10 blur-[70px]" />

            <img
              src={logo}
              alt="KC Esports"
              className="relative z-10 w-full max-w-52.5 object-contain drop-shadow-[0_0_25px_rgba(0,184,255,0.2)]"
            />
          </motion.div>

          {/* Born To Compete */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
            duration: 0.7,
            delay: 0.35,
            ease: "easeOut",
            }}
            className="w-[45%] text-left"
          >
            <h1 className="font-heading text-[35px] font-bold uppercase leading-[0.9] tracking-tight text-kc-white">
              Born To
              <br />
              <span className="text-kc-blue">
                Compete.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: 0.6,
            }}
            className="text-center"
            >
            <p className="mt-8 text-[14px] leading-6 text-kc-muted">
                Five friends. One village. One squad.
            </p>

            <p className="mt-1 text-[12px] text-kc-muted/70">
                Representing Khas Chowmuhani in Free Fire.
            </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: 0.75,
            }}
            className="mt-7 flex w-full max-w-85 gap-3"
            >
            <a
                href="#team"
                className="flex-1 bg-kc-blue px-3 py-3.5 font-heading text-[11px] font-bold tracking-widest text-kc-bg transition-transform active:scale-95"
            >
                MEET THE SQUAD
            </a>

            <a
                href="#about"
                className="flex-1 border border-kc-border bg-white/5 px-3 py-3.5 font-heading text-[11px] font-bold tracking-widest text-kc-white transition-transform active:scale-95"
            >
                OUR STORY
            </a>
        </motion.div>

        {/* Bottom Label */}
        <div className="mt-9 flex items-center gap-3">
          <span className="h-px w-5 bg-kc-border" />

          <span className="font-heading text-[9px] tracking-[0.3em] text-kc-muted">
            FREE FIRE ESPORTS
          </span>

          <span className="h-px w-5 bg-kc-border" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
import { FaInstagram } from "react-icons/fa";
import logo from "../../assets/kc_png.png";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-kc-bg">
      {/* Instagram CTA */}
      <div className="relative border-b border-kc-border px-5 py-16">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kc-blue/10 blur-[100px]" />

        <div className="relative mx-auto max-w-md text-center">
          <FaInstagram
            size={28}
            className="mx-auto text-kc-blue"
          />

          <p className="mt-4 font-heading text-[10px] font-semibold tracking-[0.3em] text-kc-blue">
            FOLLOW THE SQUAD
          </p>

          <h2 className="mt-3 font-heading text-[36px] font-bold uppercase leading-none text-kc-white">
            Stay With
            <br />
            <span className="text-kc-blue">KC Esports.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-75 text-[12px] leading-5 text-kc-muted">
            Follow KC ESPORTS on Instagram for squad moments, game clips,
            updates and everything in between.
          </p>

          <a
            href="YOUR_KC_ESPORTS_INSTAGRAM_URL"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-7 flex w-fit items-center gap-3 border border-kc-blue bg-kc-blue/10 px-6 py-3.5 font-heading text-[11px] font-bold tracking-[0.15em] text-kc-blue transition-colors active:bg-kc-blue active:text-kc-bg"
          >
            <FaInstagram size={17} />
            FOLLOW ON INSTAGRAM
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-md px-5 pb-8 pt-10">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
        <img
            src={logo}
            alt="KC Esports"
            className="w-28 object-contain"
        />

        <div className="text-left">
            <h3 className="font-heading text-2xl font-bold uppercase leading-none tracking-wider text-kc-white">
            KC
            </h3>

            <h3 className="font-heading text-2xl font-bold uppercase leading-none tracking-wider text-kc-blue">
            ESPORTS
            </h3>
        </div>
        </div>

        {/* Navigation */}
        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3">
          <a
            href="#home"
            className="font-heading text-[10px] tracking-[0.15em] text-kc-muted"
          >
            HOME
          </a>

          <a
            href="#team"
            className="font-heading text-[10px] tracking-[0.15em] text-kc-muted"
          >
            TEAM
          </a>

          <a
            href="#about"
            className="font-heading text-[10px] tracking-[0.15em] text-kc-muted"
          >
            ABOUT
          </a>

          <a
            href="#achievements"
            className="font-heading text-[10px] tracking-[0.15em] text-kc-muted"
          >
            ACHIEVEMENTS
          </a>

          <a
            href="#gallery"
            className="font-heading text-[10px] tracking-[0.15em] text-kc-muted"
          >
            GALLERY
          </a>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-kc-border" />

        {/* Copyright */}
        <div className="text-center">
          <p className="font-heading text-[10px] tracking-[0.15em] text-kc-muted">
            © {new Date().getFullYear()} KC ESPORTS
          </p>

          <p className="mt-2 text-[9px] tracking-widest text-kc-muted/50">
            KHAS CHOWMUHANI • FREE FIRE
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
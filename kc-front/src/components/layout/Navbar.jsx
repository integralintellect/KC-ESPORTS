import { useEffect, useState } from "react";
import {LogIn, Menu, X} from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/kc_esports_logo.png";

const navLinks = [
  {
    name: "HOME",
    href: "#home",
    id: "home",
  },
  {
    name: "TEAM",
    href: "#team",
    id: "team",
  },
  {
    name: "ABOUT",
    href: "#about",
    id: "about",
  },
  {
    name: "ACHIEVEMENTS",
    href: "#achievements",
    id: "achievements",
  },
  {
    name: "GALLERY",
    href: "#gallery",
    id: "gallery",
  },
];

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      setScrolled(scrollPosition > 30);

      const checkPosition = scrollPosition + 120;

      let currentSection = "home";

      navLinks.forEach((link) => {
        const section =
          document.getElementById(link.id);

        if (section && section.offsetTop <= checkPosition) {
          currentSection = link.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // Prevent background scrolling
  // while side menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleAdminLogin = () => {
    setMenuOpen(false);

    navigate("/admin/login");
  };

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300 ${
          scrolled || menuOpen
            ? "bg-kc-bg/60 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="flex h-16 items-center justify-between px-4">

          {/* Logo */}
          <a
            href="#home"
            onClick={handleNavClick}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="KC Esports"
              className="h-11 w-auto object-contain"
            />

            <div className="flex items-baseline gap-1">
              <span className="font-heading text-[18px] font-bold tracking-wider text-kc-white">
                KC
              </span>

              <span className="font-heading text-[18px] font-bold tracking-wider text-kc-blue">
                ESPORTS
              </span>
            </div>
          </a>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (prev) => !prev
              )
            }
            className={`flex h-10 w-10 items-center justify-center border transition-all duration-300 ${
              menuOpen
                ? "border-kc-blue bg-kc-blue text-kc-bg"
                : "border-kc-border bg-kc-bg/40 text-kc-white"
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={
              menuOpen
            }
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

        </nav>
      </header>

      {/* Dark Background Overlay */}
      <div
        onClick={() =>
          setMenuOpen(false)
        }
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Right Side Drawer */}
      <aside
        className={`fixed right-0 top-0 z-40 flex h-svh w-[82%] max-w-85 flex-col border-l border-kc-border bg-kc-bg/95 pt-16 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Menu Content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5">

          {/* Menu Label */}
          <div className="pb-3 pt-6">
            <p className="font-heading text-[8px] tracking-[0.3em] text-kc-blue">
              NAVIGATION
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            {navLinks.map(
              (link, index) => {
                const isActive =
                  activeSection ===
                  link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={
                      handleNavClick
                    }
                    className={`flex items-center justify-between border-b border-kc-border/60 py-4 font-heading text-[15px] font-semibold tracking-[0.15em] transition-colors ${
                      isActive
                        ? "text-kc-blue"
                        : "text-kc-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">

                      {/* Active Line */}
                      <span
                        className={`h-0.5 transition-all duration-300 ${
                          isActive
                            ? "w-5 bg-kc-blue"
                            : "w-2 bg-kc-border"
                        }`}
                      />

                      {link.name}
                    </div>

                    {/* Number */}
                    <span
                      className={`font-heading text-[9px] ${
                        isActive
                          ? "text-kc-blue"
                          : "text-kc-muted"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </a>
                );
              }
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Admin Area */}
          <div className="border-t border-kc-border py-5">

            <p className="mb-3 font-heading text-[8px] tracking-[0.25em] text-kc-muted">
              TEAM MANAGEMENT
            </p>

            <button
              type="button"
              onClick={
                handleAdminLogin
              }
              className="flex h-12 w-full items-center justify-between border border-kc-blue/30 bg-kc-blue/5 px-4 text-kc-blue transition-colors active:bg-kc-blue active:text-kc-bg"
            >
              <div className="flex items-center gap-3">
                <LogIn
                  size={16}
                  strokeWidth={1.7}
                />

                <span className="font-heading text-[11px] font-bold tracking-[0.15em]">
                  ADMIN LOGIN
                </span>
              </div>

              <span className="font-heading text-[14px]">
                →
              </span>
            </button>

          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between border-t border-kc-border/60 py-5">

            <span className="font-heading text-[7px] tracking-[0.15em] text-kc-muted">
              KHAS CHOWMUHANI
            </span>

            <span className="font-heading text-[7px] tracking-[0.15em] text-kc-blue">
              FREE FIRE ESPORTS
            </span>

          </div>

        </div>
      </aside>
    </>
  );
}

export default Navbar;
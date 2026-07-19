import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Image,
  LogOut,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

import logo from "../assets/kc_png.png";

function AdminDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Manage Players",
      description: "Add, edit or remove squad members",
      icon: Users,
      path: "/admin/players",
    },
    {
      title: "Manage Gallery",
      description: "Add and remove squad memories",
      icon: Image,
      path: "/admin/gallery",
    },
    {
      title: "Manage Achievements",
      description: "Update the trophy cabinet",
      icon: Trophy,
      path: "/admin/achievements",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("kc_admin_token");
    navigate("/admin/login");
  };

  return (
    <main className="min-h-svh bg-kc-bg pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-kc-border bg-kc-bg/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">

          {/* Branding */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="KC Esports"
              className="h-10 w-auto object-contain"
            />

            <div>
              <p className="font-heading text-[14px] font-bold leading-none text-kc-white">
                KC ESPORTS
              </p>

              <p className="mt-1 font-heading text-[8px] tracking-[0.2em] text-kc-blue">
                ADMIN
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className="flex h-10 w-10 items-center justify-center border border-kc-border text-kc-muted transition-colors active:border-red-500/50 active:text-red-400"
          >
            <LogOut size={17} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-md px-5 pt-8">

        {/* Welcome */}
        <div>
          <div className="flex items-center gap-2">
            <Shield
              size={14}
              className="text-kc-blue"
            />

            <p className="font-heading text-[9px] tracking-[0.25em] text-kc-blue">
              ADMIN CONTROL
            </p>
          </div>

          <h1 className="mt-3 font-heading text-[36px] font-bold uppercase leading-none text-kc-white">
            The Shark
            <br />
            <span className="text-kc-blue">
              Den.
            </span>
          </h1>

          <p className="mt-4 max-w-75 text-[12px] leading-5 text-kc-muted">
            Manage everything that appears on the KC ESPORTS website.
          </p>
        </div>

        {/* Menu */}
        <div className="mt-9 space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate(item.path)}
                className="flex w-full items-center gap-4 border border-kc-border bg-kc-card p-4 text-left transition-colors active:border-kc-blue/50"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-kc-blue/20 bg-kc-blue/5 text-kc-blue">
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-[8px] text-kc-muted/40">
                      0{index + 1}
                    </span>

                    <h2 className="font-heading text-[15px] font-bold uppercase tracking-wide text-kc-white">
                      {item.title}
                    </h2>
                  </div>

                  <p className="mt-1 text-[10px] text-kc-muted">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-kc-muted"
                />
              </button>
            );
          })}
        </div>

        {/* Website Link */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-8 w-full border border-kc-border py-3.5 font-heading text-[10px] font-semibold tracking-[0.15em] text-kc-muted active:border-kc-blue active:text-kc-blue"
        >
          VIEW PUBLIC WEBSITE
        </button>

        {/* Bottom */}
        <p className="mt-8 text-center font-heading text-[8px] tracking-[0.2em] text-kc-muted/40">
          KC ESPORTS • KHAS CHOWMUHANI
        </p>
      </div>
    </main>
  );
}

export default AdminDashboard;
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/#features" },
    { label: "Templates", to: "/#templates" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          ResumeAI
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => navigate("/auth")}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Get Started
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-700 dark:text-gray-300 md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 px-6 pb-4 dark:border-gray-800 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <hr className="border-gray-200 dark:border-gray-800" />
            <button
              onClick={() => { setMobileOpen(false); navigate("/auth"); }}
              className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Sign In
            </button>
            <button
              onClick={() => { setMobileOpen(false); navigate("/auth"); }}
              className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/workers", label: "Trabajadores" },
  { to: "/form", label: "Recomendar" },
];

const Wordmark = () => (
  <Link to="/" className="group flex items-baseline gap-2" aria-label="YaOficios — inicio">
    <span className="font-display text-2xl font-extrabold tracking-[-0.03em] leading-none">
      <span className="text-bone">YA</span>
      <span className="text-acid">OFICIOS</span>
    </span>
    <span className="label-tech hidden text-faint transition-colors group-hover:text-acid sm:inline">
      SAN JUAN
    </span>
  </Link>
);

const AppHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const linkClass = ({ isActive }) =>
    `label-tech relative py-2 transition-colors ${
      isActive ? "text-acid" : "text-dim hover:text-bone"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line-dim bg-void/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Wordmark />

        {/* Navegación — escritorio */}
        <nav className="hidden items-center gap-9 sm:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/form"
            className="label-tech rounded-sm bg-acid px-4 py-2.5 text-void transition-all hover:shadow-[0_0_24px_rgba(212,252,121,0.35)]"
          >
            Sumar oficio
          </Link>
        </nav>

        {/* Botón hamburguesa — móvil */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          type="button"
          className="text-bone sm:hidden"
          aria-label={showMenu ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={showMenu}
        >
          {showMenu ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Navegación — móvil */}
      {showMenu && (
        <nav className="border-t border-line-dim bg-base px-5 py-5 sm:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `label-tech border-b border-line-dim py-4 ${isActive ? "text-acid" : "text-dim"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/form"
              onClick={() => setShowMenu(false)}
              className="label-tech mt-4 rounded-sm bg-acid px-4 py-3.5 text-center text-void"
            >
              Sumar oficio
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default AppHeader;

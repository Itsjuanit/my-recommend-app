import { FiGithub, FiLinkedin, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    id: 1,
    icon: <FiGithub />,
    url: "https://github.com/itsjuanit",
    label: "GitHub de itsjuanit",
  },
  {
    id: 2,
    icon: <FiLinkedin />,
    url: "https://www.linkedin.com/in/itsjuanit",
    label: "LinkedIn de itsjuanit",
  },
];

const navLinks = [
  { to: "/workers", label: "Trabajadores" },
  { to: "/form", label: "Recomendar a alguien" },
];

const AppFooter = () => {
  return (
    <footer className="border-t border-line-dim bg-base">
      {/* Cinta de obra como remate superior */}
      <div className="tape-hazard h-1 w-full opacity-60" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* Marca */}
          <div className="max-w-xs">
            <p className="font-display text-2xl font-extrabold tracking-[-0.03em] leading-none">
              <span className="text-bone">YA</span>
              <span className="text-acid">OFICIOS</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-dim">
              El directorio de oficios de San Juan, hecho a base de recomendaciones de vecinos.
            </p>
          </div>

          {/* Navegación */}
          <nav>
            <h2 className="label-tech text-faint">Navegación</h2>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-dim transition-colors hover:text-acid">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto / redes */}
          <div>
            <h2 className="label-tech text-faint">Seguinos</h2>
            <ul className="mt-4 flex gap-3">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-line-dim text-dim transition-colors hover:border-acid hover:text-acid"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-line-dim pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-tech text-faint">
            Hecho por{" "}
            <a
              href="https://portfolio-itsjuanit.vercel.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-dim transition-colors hover:text-acid"
            >
              ITSJUANIT
            </a>
          </p>

          <Link
            to="/login"
            aria-label="Acceso de administración"
            title="Acceso de administración"
            className="flex items-center gap-2 text-faint transition-colors hover:text-acid"
          >
            <FiLock className="text-sm" />
            <span className="label-tech">Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

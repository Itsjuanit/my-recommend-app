import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import toolbox from "../../images/toolbox.png";

const trades = ["Plomería", "Gas", "Electricidad", "Carpintería", "Albañilería", "Cerrajería"];

const AppBanner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Grilla técnica de fondo */}
      <div className="grid-blueprint grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-10 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-14 lg:pt-20">
        {/* ── Columna de texto ─────────────────────────────── */}
        <div>
          <div className="rise flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
            <span className="h-px w-8 bg-acid" />
            <span className="label-tech text-acid">San Juan · Argentina</span>
          </div>

          <h1 className="rise mt-7 font-display text-[clamp(2.75rem,8vw,5.25rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.035em]">
            <span className="block text-bone">Oficios</span>
            <span className="block text-acid">Recomendados</span>
            <span className="block text-bone">por vecinos</span>
          </h1>

          <p
            className="rise mt-7 max-w-md text-lg leading-relaxed text-dim"
            style={{ animationDelay: "0.15s" }}
          >
            Plomeros, gasistas, electricistas y más. Cada trabajador está en la lista porque
            alguien de San Juan lo recomendó.
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.22s" }}
          >
            <Link
              to="/workers"
              className="label-tech group inline-flex items-center justify-center gap-2.5 rounded-sm bg-acid px-7 py-4 text-void transition-all hover:shadow-[0_0_32px_rgba(212,252,121,0.4)]"
            >
              Ver trabajadores
              <FiArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/form"
              className="label-tech inline-flex items-center justify-center rounded-sm border border-line px-7 py-4 text-dim transition-colors hover:border-acid hover:text-acid"
            >
              Recomendar a alguien
            </Link>
          </div>

          {/* Tira de oficios, como índice técnico */}
          <ul
            className="rise mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line-dim pt-6"
            style={{ animationDelay: "0.3s" }}
          >
            {trades.map((trade) => (
              <li key={trade} className="label-tech text-faint">
                {trade}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Ilustración ──────────────────────────────────────
            mix-blend-screen funde el fondo negro quemado del PNG
            con la base oscura del sitio, sin editar el archivo. */}
        <div className="rise glow-acid relative" style={{ animationDelay: "0.12s" }}>
          <img
            src={toolbox}
            width={1024}
            height={1024}
            fetchPriority="high"
            alt="Ilustración de trabajadores de distintos oficios"
            className="mx-auto w-full max-w-md mix-blend-screen lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
};

export default AppBanner;

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-blueprint grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-5 py-20 text-center sm:px-8">
        <p className="label-tech text-acid">Error 404</p>
        <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-none tracking-[-0.03em] text-bone sm:text-6xl">
          Esta página<br />no existe
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-dim">
          Puede que el enlace esté roto o que la página se haya movido.
        </p>
        <div className="mt-9">
          <Link
            to="/"
            className="label-tech inline-flex rounded-sm bg-acid px-7 py-4 text-void transition-all hover:shadow-[0_0_28px_rgba(212,252,121,0.38)]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

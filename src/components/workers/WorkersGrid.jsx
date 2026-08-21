import { useState, useEffect } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PaginationNav1 from "../reusable/PaginationNav1"; // Ajusta la ruta según tu estructura
import { getWorkerTagLabel } from "../../utils/workerTags";

// Un color por oficio: se usa como acento fino, no como fondo de la tarjeta
const TRADE_ACCENT = {
  ELECTRICISTA: "#ffe05c",
  REFRIGERACION: "#7fe8da",
  PLOMERO: "#5ec8f7",
  MUEBLES: "#d4a574",
  CARPINTERO: "#e0a46b",
  GASISTA: "#ffb13d",
  METALURGICO: "#9fb3c8",
  CERRAJERO: "#c0c8d4",
  ALBAÑIL: "#a8b4c4",
  PINTOR: "#c88bf0",
};
const DEFAULT_ACCENT = "#d4fc79";

const getAccent = (tag) => TRADE_ACCENT[tag?.toUpperCase()] ?? DEFAULT_ACCENT;

const WorkersGrid = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Usamos pageIndex (0-based) para la paginación
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 9;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageIndex(0);
  };

  useEffect(() => {
    const acceptedWorkersQuery = query(collection(db, "workers"), where("status", "==", "accepted"));
    const unsubscribe = onSnapshot(acceptedWorkersQuery, (snapshot) => {
      const acceptedWorkers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(acceptedWorkers);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filtrado considerando worker.tag o worker.tags (array)
  const filteredData = data.filter((worker) =>
    getWorkerTagLabel(worker).toLowerCase().includes(search.toLowerCase())
  );

  // Cálculo de paginación (0-based)
  const indexOfFirstItem = pageIndex * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
      {/* ── Encabezado de sección ────────────────────────────── */}
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-acid" />
        <h2 className="label-tech text-acid">Lista de trabajadores</h2>
      </div>
      <p className="mt-5 max-w-lg font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-bone sm:text-4xl">
        Buscá por oficio y contactalos directo por WhatsApp.
      </p>

      {/* ── Buscador ─────────────────────────────────────────── */}
      <div className="mt-9 flex flex-col gap-4 border-y border-line-dim py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <FiSearch
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
            aria-hidden="true"
          />
          <label htmlFor="worker-search" className="sr-only">
            Buscar por especialidad
          </label>
          <input
            id="worker-search"
            type="search"
            placeholder="Buscar por especialidad…"
            value={search}
            onChange={handleSearch}
            className="w-full rounded-sm border border-line bg-surface py-3.5 pl-11 pr-4 text-bone placeholder:text-faint transition-colors focus:border-acid focus:outline-none"
          />
        </div>
        <span className="label-tech text-faint">
          {loading ? "Cargando…" : `${filteredData.length} disponibles`}
        </span>
      </div>

      {/* ── Estados y grilla ─────────────────────────────────── */}
      {loading ? (
        <p className="py-20 text-center text-dim">Cargando trabajadores…</p>
      ) : filteredData.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-2xl font-bold text-bone">Sin resultados</p>
          <p className="mt-2 text-dim">No encontramos trabajadores con esa especialidad.</p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((worker) => {
            const tagLabel = getWorkerTagLabel(worker, "General");
            const accent = getAccent(tagLabel);

            return (
              <li
                key={worker.id}
                className="group relative flex flex-col overflow-hidden rounded-sm border border-line-dim bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]"
              >
                {/* Barra de color del oficio */}
                <span
                  aria-hidden="true"
                  className="h-0.5 w-full shrink-0"
                  style={{ backgroundColor: accent }}
                />

                <div className="flex flex-1 flex-col p-6">
                  <span className="label-tech" style={{ color: accent }}>
                    {tagLabel}
                  </span>

                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-bone">
                    {worker.name}
                  </h3>

                  {worker.opinion && (
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-dim">
                      “{worker.opinion}”
                    </p>
                  )}

                  <a
                    href={`https://api.whatsapp.com/send?phone=${worker.phone_number}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label-tech mt-6 flex items-center justify-center gap-2 rounded-sm border border-line py-3.5 text-dim transition-colors group-hover:border-acid group-hover:bg-acid group-hover:text-void"
                  >
                    <AiOutlineWhatsApp className="text-base" />
                    Contactar
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* ── Paginación ───────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <PaginationNav1
            gotoPage={setPageIndex}
            canPreviousPage={pageIndex > 0}
            canNextPage={pageIndex < totalPages - 1}
            pageCount={totalPages}
            pageIndex={pageIndex}
          />
        </div>
      )}
    </section>
  );
};

export default WorkersGrid;

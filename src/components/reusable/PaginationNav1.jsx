export default function PaginationNav1({ pageIndex, pageCount, gotoPage, canPreviousPage, canNextPage }) {
  const arrowClass =
    "label-tech rounded-sm border border-line-dim px-4 py-2.5 text-dim transition-colors hover:border-acid hover:text-acid disabled:pointer-events-none disabled:opacity-35";

  return (
    <nav aria-label="Paginación de trabajadores">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button onClick={() => gotoPage(pageIndex - 1)} disabled={!canPreviousPage} className={arrowClass}>
            Anterior
          </button>
        </li>

        {Array.from({ length: pageCount }).map((_, i) => (
          <li key={i}>
            <button
              onClick={() => gotoPage(i)}
              aria-current={i === pageIndex ? "page" : undefined}
              aria-label={`Página ${i + 1}`}
              className={`label-tech h-10 w-10 rounded-sm border transition-colors ${
                i === pageIndex
                  ? "border-acid bg-acid text-void"
                  : "border-line-dim text-dim hover:border-acid hover:text-acid"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li>
          <button onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage} className={arrowClass}>
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}

import { useState, useEffect } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PaginationNav1 from "../reusable/PaginationNav1"; // Ajusta la ruta según tu estructura
import { getWorkerTagLabel } from "../../utils/workerTags";

const WorkersGrid = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Usamos pageIndex (0-based) para la paginación
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 9;

  const getBackgroundImage = (tag) => {
    if (!tag) return "";
    switch (tag.toUpperCase()) {
      case "ELECTRICISTA":
        return "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)";
      case "REFRIGERACION":
        return "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)";
      case "PLOMERO":
        return "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)";
      case "MUEBLES":
        return "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)";
      case "CARPINTERO":
        return "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)";
      case "GASISTA":
        return "linear-gradient(to top, #f8ac08 0%, #576061 100%)";
      case "METALURGICO":
        return "linear-gradient(to top, #03e4ac 0%, #ee1e9e 100%)";
      case "CERRAJERO":
        return "linear-gradient(to top, #bbf0e4 0%, #7bafda 100%)";
      case "ALBAÑIL":
        return "linear-gradient(to top, #47ceae 0%, #566674 100%)";
      default:
        return "";
    }
  };

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
    <section className="py-5 sm:py-10 mt-5 sm:mt-10 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl sm:text-4xl mb-2 text-gray-900">LISTA DE TRABAJADORES</h1>
        <p className="text-gray-600 max-w-md mx-auto">Encuentra profesionales calificados para tu proyecto</p>
      </div>

      <div className="max-w-screen-lg mx-auto px-4">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <a className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por especialidad..."
              value={search}
              onChange={handleSearch}
              className="w-full py-3 pl-10 pr-4 text-gray-700 border rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Cargando trabajadores...</p>
        </div>
      )}

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8 max-w-screen-lg mx-auto px-4">
        {currentItems.map((worker) => {
          const tagLabel = getWorkerTagLabel(worker, "General");
          return (
          <div key={worker.id} className="group">
            <div
              className="mb-4 relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
              style={{
                backgroundImage: getBackgroundImage(tagLabel),
                marginRight: "10px",
              }}
            >
              <div className="p-5 backdrop-blur-[2px] backdrop-brightness-[1.02]">
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
                    style={{
                      backgroundImage: getBackgroundImage(tagLabel),
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      color: "#212121",
                    }}
                  >
                    {tagLabel}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{worker.name}</h3>
                <div className="mb-4 text-gray-700 text-sm min-h-[60px] line-clamp-3">{worker.opinion}</div>
                <a
                  href={`https://api.whatsapp.com/send?phone=${worker.phone_number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full transition-transform duration-200 group-hover:scale-105"
                >
                  <div
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-gray-800 shadow-md"
                    style={{
                      backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                    }}
                  >
                    <AiOutlineWhatsApp className="text-lg" />
                    <span>Contactar</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {!loading && filteredData.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No se encontraron trabajadores con esa especialidad.</p>
          <p className="text-gray-400">Intenta con otra búsqueda.</p>
        </div>
      )}

      {/* Componente de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
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

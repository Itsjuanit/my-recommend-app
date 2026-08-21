"use client";

import { useState, useEffect } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlinePhone,
  AiOutlineTag,
  AiOutlineComment,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getWorkerTagLabel } from "../../utils/workerTags";

const TABS = [
  { id: "all", label: "Todos", activeClass: "shadow-md bg-blue-500 text-white border-blue-500" },
  { id: "accepted", label: "Aceptados", activeClass: "shadow-md bg-emerald-500 text-white border-emerald-500" },
  { id: "rejected", label: "Rechazados", activeClass: "shadow-md bg-red-500 text-white border-red-500" },
];

const actionButtonClass =
  "flex items-center justify-center rounded-full p-2 transition-colors duration-200 border-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none";

// Funciones para definir clases según la etiqueta o estado
const getTagClass = (tag) => {
  if (!tag) return "bg-gray-200 text-gray-600";

  const tagLower = tag.toLowerCase();
  if (tagLower.includes("pintor")) return "bg-blue-100 text-blue-800";
  if (tagLower.includes("plomero")) return "bg-green-100 text-green-800";
  if (tagLower.includes("electricista")) return "bg-amber-100 text-amber-800";
  if (tagLower.includes("gasista")) return "bg-red-100 text-red-800";
  return "bg-purple-100 text-purple-800";
};

const getStatusClass = (status) => {
  if (status === "accepted") return "bg-white text-green-800";
  if (status === "rejected") return "bg-red-100 text-red-800";
  return "bg-gray-200 text-gray-600";
};

const getStatusBarClass = (status) => {
  if (status === "accepted") return "bg-[#B8F28B]";
  if (status === "rejected") return "bg-red-500";
  return "bg-blue-500";
};

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // "all", "accepted" o "rejected"

  // Función para obtener los datos de Firestore y ordenarlos por fecha (más recientes primero)
  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workers"));
      const workerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      workerData.sort((a, b) => {
        // Si se guardó la fecha como un Firebase Timestamp, se usa toDate()
        const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
        const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
        return dateB - dateA;
      });

      setCards(workerData);
    } catch (error) {
      console.error("Error fetching cards: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el estado del trabajador en Firestore
  const updateWorkerStatus = async (workerId, newStatus) => {
    try {
      const workerRef = doc(db, "workers", workerId);
      await updateDoc(workerRef, {
        status: newStatus,
      });
      toast.success(`Trabajador marcado como ${newStatus}`);
      setCards((prev) =>
        prev.map((worker) => (worker.id === workerId ? { ...worker, status: newStatus } : worker))
      );
    } catch (error) {
      console.error("Error updating worker status:", error);
      toast.error("Error al actualizar el estado del trabajador");
    }
  };

  // Función para borrar un trabajador de Firestore y mostrar un toast
  const deleteWorker = async (workerId) => {
    try {
      const workerRef = doc(db, "workers", workerId);
      await deleteDoc(workerRef);
      toast.success("Trabajador eliminado correctamente");
      setCards((prev) => prev.filter((worker) => worker.id !== workerId));
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("Error al borrar el trabajador");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Filtrar trabajadores según la pestaña activa
  const filteredCards = cards.filter((worker) => {
    if (activeTab === "all") return true;
    return worker.status === activeTab;
  });

  // Renderizar una tarjeta de trabajador
  const renderWorkerCard = (worker) => {
    const displayTag = getWorkerTagLabel(worker, "Sin etiqueta");
    const isAccepted = worker.status === "accepted";
    const isRejected = worker.status === "rejected";

    return (
      <div
        key={worker.id}
        className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Barra superior de color según el estado */}
        <div className={`h-1 w-full ${getStatusBarClass(worker.status)}`}></div>

        <div className="p-5">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{worker.name}</h2>

          <div className="mb-3">
            <div className="flex items-start mb-3 text-sm">
              <AiOutlinePhone className="text-gray-500 mr-2 shrink-0" />
              <span className="font-medium mr-2 text-gray-600">Phone Number:</span>
              <a href={`tel:${worker.phone_number}`} className="text-blue-600 no-underline hover:underline">
                {worker.phone_number}
              </a>
            </div>

            <div className="flex items-start mb-3 text-sm">
              <AiOutlineComment className="text-gray-500 mr-2 mt-0.5 shrink-0" />
              <span className="font-medium mr-2 text-gray-600">Opinion:</span>
              <span className="text-gray-500">{worker.opinion}</span>
            </div>

            <div className="flex items-start mb-3 text-sm">
              <AiOutlineInfoCircle className="text-gray-500 mr-2 shrink-0" />
              <span className="font-medium mr-2 text-gray-600">Status:</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(worker.status)}`}>
                {worker.status}
              </span>
            </div>

            <div className="flex items-start mb-3 text-sm">
              <AiOutlineTag className="text-gray-500 mr-2 shrink-0" />
              <span className="font-medium mr-2 text-gray-600">Tag:</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTagClass(displayTag)}`}>
                {displayTag}
              </span>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="border-t border-gray-100 my-4"></div>

          {/* Botones para actualizar estado y borrar */}
          <div className="flex justify-end gap-1 mt-2">
            <button
              className={`${actionButtonClass} ${
                isAccepted ? "text-green-300" : "text-green-500 hover:bg-green-50 hover:text-green-700"
              }`}
              onClick={() => !isAccepted && updateWorkerStatus(worker.id, "accepted")}
              disabled={isAccepted}
              title="Marcar como Aceptado"
            >
              <AiOutlineCheck className="text-xl" />
              <span className="sr-only">Aceptar</span>
            </button>
            <button
              className={`${actionButtonClass} ${
                isRejected ? "text-red-300" : "text-red-500 hover:bg-red-50 hover:text-red-700"
              }`}
              onClick={() => !isRejected && updateWorkerStatus(worker.id, "rejected")}
              disabled={isRejected}
              title="Marcar como Rechazado"
            >
              <AiOutlineClose className="text-xl" />
              <span className="sr-only">Rechazar</span>
            </button>
            <button
              className={`${actionButtonClass} text-gray-500 hover:bg-gray-50 hover:text-gray-600`}
              onClick={() => deleteWorker(worker.id)}
              title="Borrar trabajador"
            >
              <AiOutlineDelete className="text-xl" />
              <span className="sr-only">Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <div className="bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 border border-white ${
                activeTab === tab.id ? tab.activeClass : "bg-white text-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mostrar trabajadores según la pestaña seleccionada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-10 text-gray-500">Cargando trabajadores...</div>
          ) : filteredCards.length > 0 ? (
            filteredCards.map((worker) => renderWorkerCard(worker))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No hay trabajadores para mostrar en esta categoría.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

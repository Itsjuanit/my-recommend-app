"use client";

import { useState, useEffect } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlinePhone,
  AiOutlineTag,
  AiOutlineComment,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getWorkerTagLabel } from "../../utils/workerTags";

const TABS = [
  { id: "all", label: "Todos" },
  { id: "pending", label: "Pendientes" },
  { id: "accepted", label: "Aceptados" },
  { id: "rejected", label: "Rechazados" },
];

const STATUS = {
  accepted: { label: "Aceptado", color: "#d4fc79" },
  rejected: { label: "Rechazado", color: "#ff5c5c" },
  pending: { label: "Pendiente", color: "#ff8a3d" },
};

const getStatus = (status) => STATUS[status] ?? STATUS.pending;

const actionClass =
  "flex h-10 w-10 items-center justify-center rounded-sm border border-line-dim text-dim transition-colors disabled:pointer-events-none disabled:opacity-30";

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // "all", "pending", "accepted" o "rejected"
  const navigate = useNavigate();

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
      toast.success(`Trabajador marcado como ${getStatus(newStatus).label.toLowerCase()}`);
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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Contador por pestaña
  const countFor = (tabId) =>
    tabId === "all"
      ? cards.length
      : cards.filter((worker) => (worker.status ?? "pending") === tabId).length;

  // Filtrar trabajadores según la pestaña activa
  const filteredCards = cards.filter((worker) => {
    if (activeTab === "all") return true;
    return (worker.status ?? "pending") === activeTab;
  });

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <ToastContainer theme="dark" />

      {/* ── Encabezado ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-dim pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-acid" />
            <span className="label-tech text-acid">Panel interno</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.03em] text-bone">
            Moderación
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="label-tech flex items-center gap-2 rounded-sm border border-line-dim px-4 py-2.5 text-dim transition-colors hover:border-alert hover:text-alert"
        >
          <FiLogOut className="text-sm" />
          Salir
        </button>
      </div>

      {/* ── Pestañas ─────────────────────────────────────────── */}
      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            className={`label-tech flex items-center gap-2 rounded-sm border px-4 py-2.5 transition-colors ${
              activeTab === tab.id
                ? "border-acid bg-acid text-void"
                : "border-line-dim text-dim hover:border-line hover:text-bone"
            }`}
          >
            {tab.label}
            <span className={activeTab === tab.id ? "text-void/60" : "text-faint"}>
              {countFor(tab.id)}
            </span>
          </button>
        ))}
      </div>

      {/* ── Fichas ───────────────────────────────────────────── */}
      {loading ? (
        <p className="py-20 text-center text-dim">Cargando trabajadores…</p>
      ) : filteredCards.length === 0 ? (
        <p className="py-20 text-center text-dim">No hay trabajadores en esta categoría.</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((worker) => {
            const status = getStatus(worker.status);
            const isAccepted = worker.status === "accepted";
            const isRejected = worker.status === "rejected";

            return (
              <li
                key={worker.id}
                className="flex flex-col overflow-hidden rounded-sm border border-line-dim bg-surface"
              >
                <span
                  aria-hidden="true"
                  className="h-0.5 w-full shrink-0"
                  style={{ backgroundColor: status.color }}
                />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] text-bone">
                      {worker.name}
                    </h2>
                    <span className="label-tech shrink-0" style={{ color: status.color }}>
                      {status.label}
                    </span>
                  </div>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex items-center gap-2.5">
                      <dt className="sr-only">Teléfono</dt>
                      <AiOutlinePhone className="shrink-0 text-faint" aria-hidden="true" />
                      <dd>
                        <a
                          href={`tel:${worker.phone_number}`}
                          className="font-tech text-xs text-dim transition-colors hover:text-acid"
                        >
                          {worker.phone_number}
                        </a>
                      </dd>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <dt className="sr-only">Oficio</dt>
                      <AiOutlineTag className="shrink-0 text-faint" aria-hidden="true" />
                      <dd className="label-tech text-dim">
                        {getWorkerTagLabel(worker, "Sin etiqueta")}
                      </dd>
                    </div>

                    {worker.opinion && (
                      <div className="flex gap-2.5">
                        <dt className="sr-only">Opinión</dt>
                        <AiOutlineComment className="mt-0.5 shrink-0 text-faint" aria-hidden="true" />
                        <dd className="leading-relaxed text-dim">{worker.opinion}</dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-6 flex justify-end gap-2 border-t border-line-dim pt-5">
                    <button
                      className={`${actionClass} hover:border-acid hover:text-acid`}
                      onClick={() => !isAccepted && updateWorkerStatus(worker.id, "accepted")}
                      disabled={isAccepted}
                      title="Marcar como aceptado"
                    >
                      <AiOutlineCheck />
                      <span className="sr-only">Aceptar</span>
                    </button>
                    <button
                      className={`${actionClass} hover:border-alert hover:text-alert`}
                      onClick={() => !isRejected && updateWorkerStatus(worker.id, "rejected")}
                      disabled={isRejected}
                      title="Marcar como rechazado"
                    >
                      <AiOutlineClose />
                      <span className="sr-only">Rechazar</span>
                    </button>
                    <button
                      className={`${actionClass} hover:border-alert hover:bg-alert hover:text-void`}
                      onClick={() => deleteWorker(worker.id)}
                      title="Borrar trabajador"
                    >
                      <AiOutlineDelete />
                      <span className="sr-only">Eliminar</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Dashboard;

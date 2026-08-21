import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import FormInput, { fieldClass, labelClass } from "../reusable/FormInput";
import Button from "../reusable/Button";

export const FormNewPerson = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [opinion, setOpinion] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [sending, setSending] = useState(false);

  const categories = [
    { id: 1, name: "Plomero" },
    { id: 2, name: "Gasista" },
    { id: 3, name: "Electricista" },
    { id: 4, name: "Carpintero" },
    { id: 5, name: "Albañil" },
    { id: 6, name: "Cerrajero" },
    { id: 7, name: "Pintor" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTag = tags[0]?.trim();
    if (!name || !number || !opinion || !trimmedTag) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (!/^\d{6,15}$/.test(number)) {
      toast.error("Ingresá un número de celular válido (solo dígitos).");
      return;
    }

    const data = {
      name,
      phone_number: "54" + number,
      opinion,
      tags,
      status: "pending",
      date: serverTimestamp(), // Se agrega la fecha de creación
    };

    setSending(true);
    try {
      await addDoc(collection(db, "workers"), data);
      setName("");
      setNumber("");
      setOpinion("");
      setTags([]);
      setSelectedCategory("");
      setCustomCategory("");
      toast.success("Tu información ha sido enviada y guardada.");
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      toast.error("Error al enviar la información.");
    } finally {
      setSending(false);
    }
  };

  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    if (value !== "other") {
      setTags([value]);
      setCustomCategory("");
    } else {
      setTags([]); // Se espera que se ingrese un oficio personalizado
    }
  };

  const handleCustomCategoryChange = (event) => {
    setCustomCategory(event.target.value);
    setTags([event.target.value]);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="grid-blueprint grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-acid" />
          <span className="label-tech text-acid">Sumar un oficio</span>
        </div>

        <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-bone sm:text-5xl">
          Recomendá a<br />
          <span className="text-acid">alguien que confíes</span>
        </h1>
        <p className="mt-5 text-dim">
          Contanos a quién conocés y por qué lo recomendás. Revisamos cada envío antes de publicarlo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-sm border border-line-dim bg-surface p-6 sm:p-8"
        >
          <FormInput
            label="Nombre del trabajador"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ej. Juan Pérez"
          />

          <FormInput
            label="Número de celular"
            id="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="2645551234"
            hint="Sin 0, sin 15 y sin el +54 — eso lo agregamos nosotros."
          />

          <div className="mb-6">
            <label htmlFor="opinion" className={labelClass}>
              Tu opinión
            </label>
            <textarea
              id="opinion"
              rows={4}
              value={opinion}
              onChange={(event) => setOpinion(event.target.value)}
              placeholder="¿Qué trabajo te hizo? ¿Por qué lo recomendás?"
              className={`${fieldClass} resize-y`}
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="category" className={labelClass}>
              Oficio
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleSelectChange}
              className={fieldClass}
              required
            >
              <option value="">Seleccioná un oficio</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {capitalizeFirstLetter(category.name)}
                </option>
              ))}
              <option value="other">Otro oficio (sugerir)</option>
            </select>

            {selectedCategory === "other" && (
              <input
                type="text"
                value={customCategory}
                onChange={handleCustomCategoryChange}
                placeholder="¿Qué oficio hace?"
                className={`${fieldClass} mt-3`}
              />
            )}
          </div>

          <Button type="submit" disabled={sending} className="w-full">
            {sending ? "Enviando…" : "Enviar recomendación"}
          </Button>
        </form>
      </div>

      <ToastContainer theme="dark" />
    </section>
  );
};

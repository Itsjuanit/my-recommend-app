import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Importa tu configuración de Firebase
import FormInput, { fieldClass, labelClass } from "../reusable/FormInput";
import Button from "../reusable/Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Autenticación exitosa");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en la autenticación:", error);
      toast.error("Por favor ingresa el usuario y la contraseña correctos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="grid-blueprint grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-acid" />
          <span className="label-tech text-acid">Acceso restringido</span>
        </div>

        <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.03em] text-bone">
          Panel de<br />administración
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-sm border border-line-dim bg-surface p-6 sm:p-8"
        >
          <FormInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vos@ejemplo.com"
          />

          <div className="mb-8">
            <label className={labelClass} htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                className={`${fieldClass} pr-12`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-faint transition-colors hover:text-acid"
              >
                {passwordVisible ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Ingresando…" : "Ingresar"}
          </Button>
        </form>
      </div>
    </section>
  );
};

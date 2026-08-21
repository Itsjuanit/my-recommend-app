import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Importa tu configuración de Firebase
import FormInput from "../reusable/FormInput";
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
    <div className="container mx-auto">
      <div className="w-full max-w-md mx-auto mt-8 bg-white shadow-md rounded-[10px] border border-[#d4fc79] px-8 pt-6 pb-8">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="EMAIL"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="font-general-regular mb-4">
            <label className="block text-lg text-primary-dark dark:text-primary-light mb-1" htmlFor="password">
              CONTRASEÑA
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full px-5 py-2 pr-10 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center cursor-pointer"
              >
                {passwordVisible ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 px-4 rounded-[10px] font-bold text-[#212121] bg-[linear-gradient(120deg,#d4fc79_0%,#96e6a1_100%)] disabled:opacity-60"
          >
            {loading ? "INGRESANDO..." : "INGRESAR"}
          </Button>
        </form>
      </div>
    </div>
  );
};

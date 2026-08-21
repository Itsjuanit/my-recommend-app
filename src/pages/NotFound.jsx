import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light mb-4">
        Página no encontrada
      </h1>
      <Link to="/" className="text-blue-600 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;

import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Error no controlado:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-primary-dark dark:text-primary-light mb-2">
            Algo salió mal
          </h1>
          <p className="text-gray-500">Probá recargar la página en unos minutos.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

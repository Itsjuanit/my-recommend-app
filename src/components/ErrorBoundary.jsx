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
        <div className="mx-auto max-w-xl px-5 py-24 text-center">
          <p className="label-tech text-alert">Error</p>
          <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.03em] text-bone">
            Algo salió mal
          </h1>
          <p className="mt-4 text-dim">Probá recargar la página en unos minutos.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

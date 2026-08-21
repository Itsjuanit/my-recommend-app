import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import AppFooter from "./components/shared/AppFooter";
import AppHeader from "./components/shared/AppHeader";
import "./css/App.css";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import("./pages/Home"));
const Workers = lazy(() => import("./pages/Workers"));
const Form = lazy(() => import("./pages/Form"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProtectedRoute = lazy(() => import("./components/login/ProtectedRoute"));

const RouteLoadingFallback = () => (
  <div className="flex items-center justify-center py-32">
    <AiOutlineLoading3Quarters className="animate-spin text-2xl text-faint" aria-label="Cargando" />
  </div>
);

function App() {
  return (
    <AnimatePresence>
      <div key="app" className="flex min-h-screen flex-col bg-void">
        <ToastContainer theme="dark" />
        <Router>
          <ScrollToTop />
          <AppHeader />
          <main className="flex-1">
            <ErrorBoundary>
              <Suspense fallback={<RouteLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="workers" element={<Workers />} />
                  <Route path="form" element={<Form />} />
                  <Route path="login" element={<LoginPage />} />

                  {/* Rutas protegidas */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <AppFooter />
        </Router>
        <ScrollToTopButton />
      </div>
      <Analytics key="analytics" />
    </AnimatePresence>
  );
}

export default App;

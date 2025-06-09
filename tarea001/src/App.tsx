/**
 * @file App.tsx
 * @description Componente principal que configura las rutas de la aplicación usando React Router.
 * Proporciona el contexto de autenticación a todos los componentes hijos mediante AuthProvider.
 * Las rutas incluyen la página de inicio de sesión y el dashboard protegido.
 */

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * @function App
 * @description Componente funcional que renderiza las rutas de la aplicación.
 * @returns {JSX.Element} Estructura de rutas envuelta en el proveedor de autenticación.
 */
function App() {
  return (
    <AuthProvider>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
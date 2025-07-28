import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PerfilPage from "./pages/PerfilPage";

const App = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const RutaProtegida = ({ children, rol }) => {
    if (!usuario) return <Navigate to="/" />;

    if (rol && usuario.rol !== rol) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <RutaProtegida rol="admin">
              <DashboardPage />
            </RutaProtegida>
          }
        />

        <Route
          path="/perfil"
          element={
            <RutaProtegida rol="estudiante">
              <PerfilPage />
            </RutaProtegida>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

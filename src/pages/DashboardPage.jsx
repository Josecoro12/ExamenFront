
import { useState } from "react";
import EstudianteList from "../components/EstudianteList";
import EstudianteForm from "../components/EstudianteForm";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [recarga, setRecarga] = useState(false);

  const recargar = () => setRecarga(!recarga);

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        overflow: 'hidden',
        padding: 0,
      }}>
        <div style={{
          width: '100%',
          maxWidth: 950,
          background: '#fff',
          borderRadius: 22,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: 36,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 32, color: '#3b3b5c', letterSpacing: 1 }}>🛠 Panel de Administración</h2>
          <EstudianteForm estudiante={estudianteSeleccionado} recargar={recargar} />
          <EstudianteList key={recarga} onEdit={setEstudianteSeleccionado} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

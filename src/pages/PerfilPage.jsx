import { useEffect, useState } from "react";
import { getEstudianteById } from "../services/api";

const PerfilPage = () => {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const u = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (u?.id && token) {
      getEstudianteById(u.id, token)
        .then((res) => {
          if (!isMounted) return;
          if (res && !res.mensaje) {
            setPerfil(res);
          } else {
            setError(res?.mensaje || "No se pudo cargar el perfil");
          }
        })
        .catch(() => {
          if (isMounted) setError("Error al cargar el perfil");
        });
    } else {
      setError("No hay usuario autenticado");
    }
    return () => { isMounted = false; };
  }, []);

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <div style={{ color: '#d9534f', fontWeight: 'bold', background: '#fff3f3', borderRadius: 10, padding: 24, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 12px #e0e7ff' }}>{error}</div>
    </div>
  );
  if (!perfil) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <div style={{ color: '#888', fontWeight: 'bold', background: '#fff', borderRadius: 10, padding: 24, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 12px #e0e7ff' }}>Cargando perfil...</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #b6c6e6', padding: 36, minWidth: 350, maxWidth: 400, width: '100%' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 28, textAlign: 'center', color: '#3b3b5c', letterSpacing: 1 }}>👤 Mi Perfil</h2>
        <div style={{ fontSize: 18, marginBottom: 16 }}><b>Nombre:</b> {perfil?.nombre || '-'}</div>
        <div style={{ fontSize: 18, marginBottom: 16 }}><b>Email:</b> {perfil?.email || '-'}</div>
        <div style={{ fontSize: 18, marginBottom: 16 }}><b>Carrera:</b> {perfil?.carrera || '-'}</div>
        <div style={{ fontSize: 18, marginBottom: 16 }}><b>Edad:</b> {perfil?.edad ?? '-'}</div>
      </div>
    </div>
  );
};

export default PerfilPage;

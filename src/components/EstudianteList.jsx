import { useEffect, useState } from "react";
import {
  getEstudiantes,
  deleteEstudiante,
} from "../services/estudianteService";

const EstudianteList = ({ onEdit }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = async () => {
    setLoading(true);
    setError("");
    try {
      const datos = await getEstudiantes();
      if (Array.isArray(datos)) {
        setEstudiantes(datos);
      } else {
        setEstudiantes([]);
        setError(datos?.mensaje || "No se pudieron cargar los estudiantes");
      }
    } catch {
      setError("Error al cargar estudiantes");
      setEstudiantes([]);
    }
    setLoading(false);
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este estudiante?')) {
      await deleteEstudiante(id);
      cargar();
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 0, margin: 0 }}>
      <div style={{ width: '100%', maxWidth: 850, background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', padding: 36, margin: '0 auto' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 24, textAlign: 'center', color: '#3b3b5c', letterSpacing: 1 }}>📋 Lista de Estudiantes</h3>
        {loading ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#888', fontSize: 18 }}>Cargando...</div>
        ) : error ? (
          <div style={{ color: '#d9534f', padding: 16, background: '#fff3f3', borderRadius: 8, textAlign: 'center', fontWeight: 'bold' }}>{error}</div>
        ) : estudiantes.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#888', fontSize: 18 }}>No hay estudiantes registrados.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', margin: '0 auto' }}>
              <thead>
                <tr style={{ background: '#f0f4f8' }}>
                  <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Nombre</th>
                  <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Edad</th>
                  <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Carrera</th>
                  <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Email</th>
                  <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e, idx) => (
                  <tr
                    key={e._id}
                    style={{
                      transition: 'background 0.2s',
                      background: idx % 2 === 0 ? '#f9fafb' : '#fff',
                      cursor: 'pointer',
                    }}
                    tabIndex={0}
                    aria-label={`Estudiante ${e.nombre}`}
                    onKeyDown={ev => {
                      if (ev.key === 'Enter') onEdit(e);
                    }}
                    onMouseOver={ev => (ev.currentTarget.style.background = '#e6f0fa')}
                    onMouseOut={ev => (ev.currentTarget.style.background = idx % 2 === 0 ? '#f9fafb' : '#fff')}
                  >
                    <td style={{ padding: 10, border: '1px solid #eee', textAlign: 'center' }}>{e.nombre}</td>
                    <td style={{ padding: 10, border: '1px solid #eee', textAlign: 'center' }}>{e.edad ?? '-'}</td>
                    <td style={{ padding: 10, border: '1px solid #eee', textAlign: 'center' }}>{e.carrera}</td>
                    <td style={{ padding: 10, border: '1px solid #eee', textAlign: 'center' }}>{e.email}</td>
                    <td style={{ padding: 10, border: '1px solid #eee', textAlign: 'center' }}>
                      <button
                        style={{
                          marginRight: 8,
                          background: '#f0ad4e',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 16px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          boxShadow: '0 1px 2px #eee',
                          outline: 'none',
                          transition: 'background 0.2s',
                          fontSize: 15
                        }}
                        onClick={() => onEdit(e)}
                        onMouseOver={ev => (ev.currentTarget.style.background = '#ec971f')}
                        onMouseOut={ev => (ev.currentTarget.style.background = '#f0ad4e')}
                      >Editar</button>
                      <button
                        style={{
                          background: '#d9534f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 16px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          boxShadow: '0 1px 2px #eee',
                          outline: 'none',
                          transition: 'background 0.2s',
                          fontSize: 15
                        }}
                        onClick={() => eliminar(e._id)}
                        onMouseOver={ev => (ev.currentTarget.style.background = '#b52b27')}
                        onMouseOut={ev => (ev.currentTarget.style.background = '#d9534f')}
                      >Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstudianteList;

import { useState } from "react";
import {
  createEstudiante,
  updateEstudiante,
} from "../services/estudianteService";

const EstudianteForm = ({ estudiante, recargar }) => {
  const [form, setForm] = useState(
    estudiante || { nombre: "", edad: "", carrera: "", email: "", password: "" }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await updateEstudiante(form._id, form);
    } else {
      await createEstudiante(form);
    }
    recargar();
    setForm({ nombre: "", edad: "", carrera: "", email: "", password: "" });
  };

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center',
        background: 'rgba(244,247,250,0.95)',
        padding: 28,
        borderRadius: 18,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        width: '100%',
        justifyContent: 'center',
        margin: 0
      }}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 8, border: '1px solid #b6c6e6', fontSize: 16, background: '#f8fafc' }} />
        <input name="edad" value={form.edad} onChange={handleChange} placeholder="Edad" required style={{ width: 80, padding: 12, borderRadius: 8, border: '1px solid #b6c6e6', fontSize: 16, background: '#f8fafc' }} />
        <input name="carrera" value={form.carrera} onChange={handleChange} placeholder="Carrera" required style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 8, border: '1px solid #b6c6e6', fontSize: 16, background: '#f8fafc' }} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" required style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 8, border: '1px solid #b6c6e6', fontSize: 16, background: '#f8fafc' }} />
        {!form._id && (
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 8, border: '1px solid #b6c6e6', fontSize: 16, background: '#f8fafc' }} />
        )}
        <button type="submit" style={{
          background: 'linear-gradient(90deg, #0275d8 0%, #009ffd 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 28px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 17,
          boxShadow: '0 1px 2px #eee',
          transition: 'background 0.2s',
          marginLeft: 8
        }}>{form._id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default EstudianteForm;

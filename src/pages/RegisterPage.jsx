// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    carrera: "",
    edad: ""
  });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate("/dashboard");
    } else {
      setMensaje(data.mensaje || "Error al registrarse");
    }
  };

  return (
    <div>
      <h2>📝 Registro de Estudiante</h2>
      <form onSubmit={handleRegister}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required /><br />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" required /><br />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required /><br />
        <input name="carrera" value={form.carrera} onChange={handleChange} placeholder="Carrera" required /><br />
        <input name="edad" type="number" value={form.edad} onChange={handleChange} placeholder="Edad" required /><br />
        <button type="submit">Registrarse</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default RegisterPage;

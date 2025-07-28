
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      if (!res.token) {
        return setError(res.mensaje || "Error al iniciar sesión");
      }
      if (!res.usuario || !res.usuario.role) {
        return setError("Credenciales inválidas o usuario sin rol válido");
      }
      localStorage.setItem("token", res.token);
      localStorage.setItem("usuario", JSON.stringify({ id: res.usuario.id, rol: res.usuario.role }));
      // Redirigir según rol
      if (res.usuario.role === "admin") {
        navigate("/admin");
      } else if (res.usuario.role === "estudiante") {
        navigate("/perfil");
      } else {
        setError("Rol de usuario no permitido");
      }
    } catch {
      setError("Error del servidor. Intenta más tarde.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      overflow: 'hidden'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: 36,
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 0
        }}
      >
        <h2 style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 28, textAlign: 'center', color: '#3b3b5c', letterSpacing: 1 }}>Iniciar Sesión</h2>
        {error && (
          <div style={{ color: '#d9534f', marginBottom: 18, fontWeight: 'bold', textAlign: 'center', background: '#fff3f3', borderRadius: 8, padding: 10 }}>{error}</div>
        )}
        <div style={{ width: '100%', marginBottom: 18 }}>
          <label style={{ display: 'block', color: '#3b3b5c', marginBottom: 6, fontWeight: 500 }}>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #b6c6e6', fontSize: 16 }}
          />
        </div>
        <div style={{ width: '100%', marginBottom: 28 }}>
          <label style={{ display: 'block', color: '#3b3b5c', marginBottom: 6, fontWeight: 500 }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #b6c6e6', fontSize: 16 }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #0275d8 0%, #009ffd 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            fontWeight: 'bold',
            fontSize: 18,
            boxShadow: '0 1px 2px #eee',
            transition: 'background 0.2s',
            cursor: 'pointer',
            marginTop: 8
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

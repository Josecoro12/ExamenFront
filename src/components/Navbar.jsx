import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  return (
    <nav style={{
      width: '100%',
      background: 'linear-gradient(90deg, #0275d8 0%, #009ffd 100%)',
      padding: '16px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px #e0e7ff',
      marginBottom: 32,
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ marginLeft: 32, color: '#fff', fontWeight: 'bold', fontSize: 22, letterSpacing: 1 }}>
        Sistema Estudiantes
      </div>
      <div style={{ marginRight: 32, display: 'flex', alignItems: 'center', gap: 18 }}>
        {usuario && (
          <span style={{ color: '#fff', fontWeight: 500, fontSize: 16 }}>
            {usuario.rol === 'admin' ? 'Administrador' : 'Estudiante'}
          </span>
        )}
        <button
          onClick={handleLogout}
          style={{
            background: '#fff',
            color: '#0275d8',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 'bold',
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 1px 2px #eee',
            transition: 'background 0.2s',
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

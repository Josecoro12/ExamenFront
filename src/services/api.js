const API_URL = 'https://examenback-svpj.onrender.com'; // Cambia esto si tu backend está en otra URL

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getEstudiantes = async (token) => {
  const res = await fetch(`${API_URL}/estudiante`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const getEstudianteById = async (id, token) => {
  const res = await fetch(`${API_URL}/estudiante/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const createEstudiante = async (data, token) => {
  const res = await fetch(`${API_URL}/estudiante`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateEstudiante = async (id, data, token) => {
  const res = await fetch(`${API_URL}/estudiante/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteEstudiante = async (id, token) => {
  const res = await fetch(`${API_URL}/estudiante/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

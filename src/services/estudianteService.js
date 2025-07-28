const API = "https://examenback-svpj.onrender.com/estudiante"; // ajusta la URL según tu backend

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getEstudiantes = () =>
  fetch(API, { headers: headers() }).then((res) => res.json());

export const getEstudianteById = (id) =>
  fetch(`${API}/${id}`, { headers: headers() }).then((res) => res.json());

export const createEstudiante = (data) =>
  fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateEstudiante = (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deleteEstudiante = (id) =>
  fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: headers(),
  }).then((res) => res.json());

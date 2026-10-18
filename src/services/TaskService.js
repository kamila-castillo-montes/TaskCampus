const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTareas = async (limite = 10) => {
  const res = await fetch(`${API_URL}?_limit=${limite}`);
  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status} al cargar tareas`);
  }
  const datos = await res.json();
  
  return datos.map((t) => ({
    id: t.id,
    titulo: t.title,
    completada: t.completed,
    prioridad: "media",
    descripcion: "Tarea cargada desde la API",
    fechaEntrega: "Hoy"
  }));
};

export const postTarea = async (titulo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titulo,
      completed: false,
      userId: 1
    })
  });
  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status} al crear tarea`);
  }
  return await res.json();
};

export const putTarea = async (id, cambios) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cambios)
  });
  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status} al actualizar tarea`);
  }
  return await res.json();
};

export const deleteTarea = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status} al eliminar tarea`);
  }
  return true;
};
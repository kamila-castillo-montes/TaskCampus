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

export const postTarea = async (nuevaTarea) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: nuevaTarea.title,
      completed: false,
      userId: 1
    })
  });

  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status} al crear tarea`);
  }

  const datos = await res.json();

  return {
    id: datos.id,
    titulo: nuevaTarea.title,
    completada: false,
    prioridad: nuevaTarea.priority,
    descripcion: nuevaTarea.description || "Sin descripción",
    fechaEntrega: nuevaTarea.dueDate
  };
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
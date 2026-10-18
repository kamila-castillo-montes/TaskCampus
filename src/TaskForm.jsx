
import { useState } from 'react';

function TaskForm({ onSubmit, submitting = false }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('media');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const titulo = title.trim();

    if (!titulo) {
      setError('El título de la tarea es obligatorio.');
      return;
    }

    if (!dueDate) {
      setError('Selecciona una fecha de entrega.');
      return;
    }

    // Obtener la fecha local, evitando diferencias por zona horaria.
    const ahora = new Date();
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0');
    const day = String(ahora.getDate()).padStart(2, '0');
    const hoy = `${year}-${month}-${day}`;

    if (dueDate < hoy) {
      setError('La fecha de entrega no puede estar en el pasado.');
      return;
    }

    if (typeof onSubmit !== 'function') {
      setError('El formulario todavía no está conectado para guardar tareas.');
      return;
    }

    try {
      await onSubmit({
        title: titulo,
        description: description.trim(),
        priority,
        dueDate
      });

      // Limpiar solo si el envío termina correctamente.
      setTitle('');
      setDescription('');
      setPriority('media');
      setDueDate('');
      setError('');
    } catch (err) {
      setError(err.message || 'No se pudo guardar la tarea. Inténtalo nuevamente.');
    }
  };
//checkpoint xd
  return (
    <form
  onSubmit={handleSubmit}
  noValidate
  style={{
    backgroundColor: "#ffffff",
    color: "#1f2937",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    margin: "24px 0",
    maxWidth: "600px"
  }}
>
  <h2
    style={{
      color: "#111827",
      marginTop: 0,
      marginBottom: "24px",
      fontSize: "24px"
    }}
  >
    Nueva tarea
  </h2>

      <div>
       <label
    htmlFor="task-title"
    style={{
      display: "block",
      color: "#374151",
      fontWeight: "600",
      marginBottom: "8px"
    }}
  >
    Título de la tarea:
  </label>

  <input
    id="task-title"
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ej. Estudiar para la solemne"
    aria-invalid={error.includes('título') || error.includes('Título')}
    aria-describedby={
      error.includes('título') || error.includes('Título')
        ? 'task-form-error'
        : undefined
    }
    required
    style={{
      display: "block",
      width: "100%",
      boxSizing: "border-box",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px"
    }}
  />
      </div>
      <div style={{ marginBottom: "18px" }}>
  <label
    htmlFor="task-description"
    style={{
      display: "block",
      color: "#374151",
      fontWeight: "600",
      marginBottom: "8px"
    }}
  >
    Descripción:
  </label>

  <textarea
    id="task-description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Detalles de la tarea..."
    rows={3}
    style={{
      display: "block",
      width: "100%",
      boxSizing: "border-box",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "inherit",
      resize: "vertical"
    }}
  />
</div>
      
      <div>
        <label htmlFor="task-priority">Prioridad: </label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

       <div>
        <label htmlFor="task-due-date">Fecha de entrega: </label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-invalid={error.includes('fecha') || error.includes('Fecha')}
          aria-describedby={error.includes('fecha') || error.includes('Fecha')
            ? 'task-form-error'
            : undefined}
          required
        />
      </div>

      {error && (
        <p
          id="task-form-error"
          role="alert"
          style={{ color: '#dc2626', fontWeight: 'bold' }}
        >
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Guardando...' : 'Guardar tarea'}
      </button>
    </form>
  );
}

export default TaskForm;

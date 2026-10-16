//  Renderizar la tarjeta de cada tarea con estilos condicionales

function TaskItem({ tarea, onToggleStatus, onDeleteTask }) {
  // Manejo de valores por defecto en caso de propiedades opcionales
  const {
    id,
    title,
    description,
    priority = 'media', // 'alta' | 'media' | 'baja'
    completed = false,
    dueDate
  } = tarea;

  // Clase según el nivel de prioridad para estilos CSS
  const getPriorityClass = (level) => {
    switch (level.toLowerCase()) {
      case 'alta':
        return 'priority-high';
      case 'media':
        return 'priority-medium';
      case 'baja':
        return 'priority-low';
      default:
        return 'priority-default';
    }
  };

  return (
    <article className={`task-item ${completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <header className="task-header">
          {/* Checkbox para alternar estado (conectado con useTasks por Emerson/Sergio) */}
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleStatus && onToggleStatus(id)}
            aria-label={`Marcar como completada ${title}`}
          />
          <h3 className="task-title">{title}</h3>
          
          {/* Badge visual de prioridad */}
          <span className={`task-badge ${getPriorityClass(priority)}`}>
            {priority.toUpperCase()}
          </span>
        </header>

        {description && <p className="task-description">{description}</p>}

        <footer className="task-footer">
          {dueDate && (
            <span className="task-due-date">
              📅 Entrega: {dueDate}
            </span>
          )}
          
          {/* Botón de eliminación con callback hacia el estado global */}
          {onDeleteTask && (
            <button
              type="button"
              className="btn-delete"
              onClick={() => onDeleteTask(id)}
              aria-label={`Eliminar tarea ${title}`}
            >
              Eliminar
            </button>
          )}
        </footer>
      </div>
    </article>
  );
}

export default TaskItem;
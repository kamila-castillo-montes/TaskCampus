// Renderizar la tarjeta de cada tarea con estilos condicionales

function TaskItem({ tarea = {}, onToggleStatus, onDeleteTask }) {
  // Leemos todas las propiedades soportando español e inglés
  const {
    id,
    title = tarea.title || tarea.titulo || 'Sin título',
    description = tarea.description || tarea.descripcion || '',
    priority = tarea.priority || tarea.prioridad || 'media',
    completed = tarea.completed ?? tarea.completada ?? false,
    dueDate = tarea.dueDate || tarea.fechaEntrega || ''
  } = tarea;

  // Clase según nivel de prioridad
  const getPriorityClass = (level) => {
    switch (String(level).toLowerCase()) {
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
    <article 
      className={`task-item ${completed ? 'task-completed' : ''}`}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #dbeafe',
        borderRadius: '8px',
        padding: '14px 16px',
        marginBottom: '10px'
      }}
    >
      <div className="task-content">
        {/* Cabecera: Checkbox + Título + Badge */}
        <header 
          className="task-header" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '12px' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggleStatus && onToggleStatus(id)}
              aria-label={`Marcar como completada ${title}`}
              style={{ cursor: 'pointer', width: '18px', height: '18px' }}
            />
            <h3 
              className="task-title" 
              style={{ 
                margin: 0, 
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? '#94a3b8' : '#0f172a',
                fontSize: '1.1rem'
              }}
            >
              {title}
            </h3>
          </div>
          
          <span 
            className={`task-badge ${getPriorityClass(priority)}`}
            style={{
              backgroundColor: priority === 'alta' ? '#fee2e2' : '#e2e8f0',
              color: priority === 'alta' ? '#dc2626' : '#475569',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            {priority.toUpperCase()}
          </span>
        </header>

        {/* Descripción (si existe) */}
        {description && (
          <p style={{ margin: '8px 0 0 28px', color: '#64748b', fontSize: '0.9rem' }}>
            {description}
          </p>
        )}

        {/* Pie de tarjeta: Fecha y Botón Eliminar */}
        <footer 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '12px',
            paddingTop: '8px',
            borderTop: '1px solid #f1f5f9'
          }}
        >
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
            {dueDate ? `📅 Entrega: ${dueDate}` : '📅 Sin fecha límite'}
          </span>
          
          <button
            type="button"
            onClick={() => onDeleteTask && onDeleteTask(id)}
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Eliminar
          </button>
        </footer>
      </div>
    </article>
  );
}

export default TaskItem;
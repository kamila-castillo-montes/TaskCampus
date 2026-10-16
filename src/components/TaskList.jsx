
import TaskItem from './TaskItem';

function TaskList({ 
  title = "Listado de tareas", 
  tareas = [], 
  cargando = false, 
  error = null,
  onEliminarTask,
  onToggleStatus,
}) {
  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>

      {/* 1. ESTADO DE CARGA*/}
      {cargando && (
        <div className="task-status loading" role="status">
          <p>Cargando tareas...</p>
        </div>
      )}

      {/* 2. ESTADO DE ERROR */}
      {!cargando && error && (
        <div className="task-status error" role="alert">
          <p>Error al cargar las tareas: {error}</p>
        </div>
      )}

      {/* 3. ESTADO VACÍO: Cuando no hay tareas registradas o no coinciden con filtros */}
      {!cargando && !error && tareas.length === 0 && (
        <div className="task-status empty">
          <p>No hay tareas disponibles en este momento.</p>
        </div>
      )}

      {/* 4. RENDERIZADO DINÁMICO: Itera sobre el array sin mutaciones */}
      {!cargando && !error && tareas.length > 0 && (
        <ul className="task-list">
          {tareas.map((task, index) => {
            // Clave única estable: usamos task.id si es objeto, o fallback a index
            const key = (typeof task === 'object' && task?.id) ? task.id : index;

            return (
              <TaskItem 
                key={key} 
                tarea={task}
                task={task}
                onToggleStatus={onToggleStatus} 
                onDeleteTask={onEliminarTask}     
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
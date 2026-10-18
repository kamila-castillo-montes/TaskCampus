import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  INITIAL_TASKS,
  TASK_FILTERS,
  createTaskEntity,
} from '../constants/initialTasks';
import * as TaskServiceModule from '../services/TaskService';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const service = TaskServiceModule.default || TaskServiceModule.TaskService || TaskServiceModule;

const fetchInitialFromApi = async () => {
  if (typeof service?.getTasks === 'function') return service.getTasks();
  if (typeof service?.obtenerTareas === 'function') return service.obtenerTareas();
  if (typeof service?.getAll === 'function') return service.getAll();

  const response = await fetch(`${API_URL}?_limit=10`);
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudieron cargar las tareas.`);
  }
  return response.json();
};

const postTaskToApi = async (payload) => {
  if (typeof service?.createTask === 'function') return service.createTask(payload);
  if (typeof service?.crearTarea === 'function') return service.crearTarea(payload);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudo crear la tarea.`);
  }
  return response.json();
};

const patchTaskInApi = async (remoteId, changes) => {
  if (typeof service?.updateTask === 'function') return service.updateTask(remoteId, changes);
  if (typeof service?.actualizarTarea === 'function') return service.actualizarTarea(remoteId, changes);

  const response = await fetch(`${API_URL}/${remoteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudo actualizar la tarea remota #${remoteId}.`);
  }
  return response.json();
};

const deleteTaskFromApi = async (remoteId) => {
  if (typeof service?.deleteTask === 'function') return service.deleteTask(remoteId);
  if (typeof service?.eliminarTarea === 'function') return service.eliminarTarea(remoteId);

  const response = await fetch(`${API_URL}/${remoteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudo eliminar la tarea remota #${remoteId}.`);
  }
  return true;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pendingTaskIds, setPendingTaskIds] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const [statusFilter, setStatusFilter] = useState(TASK_FILTERS.ALL);
  const [searchQuery, setSearchQuery] = useState('');

 const markTaskPending = useCallback((taskId) => {
    setPendingTaskIds((prevIds) =>
      prevIds.includes(taskId) ? prevIds : [...prevIds, taskId]
    );
  }, []);

  const unmarkTaskPending = useCallback((taskId) => {
    setPendingTaskIds((prevIds) => prevIds.filter((id) => id !== taskId));
  }, []);

  const isTaskPending = useCallback(
    (taskId) => pendingTaskIds.includes(taskId),
    [pendingTaskIds]
  );

  const clearError = useCallback(() => setError(null), []);
  const TAREAS_CAMPUS_ES = [
  "Configurar entorno del proyecto con Vite y React",
  "Implementar custom hook useTasks para gestión de estado",
  "Corregir reglas de estilo y formato en ESLint",
  "Integrar consumo de datos desde API externa",
  "Resolver conflictos de fusión en el repositorio de GitHub",
  "Diseñar interfaz de tarjetas y etiquetas de prioridad",
  "Redactar documentación técnica en el archivo README.md",
  "Validar compilación limpia mediante npm run build",
  "Ejecutar pruebas funcionales de creación y eliminación",
  "Preparar presentación final del sprint con el equipo"
];

const loadInitialTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchInitialFromApi();
      const firstTen = Array.isArray(data) ? data.slice(0, 10) : [];
      const normalized = firstTen.map((item, index) => {
        const entity = createTaskEntity(item, { isFromPost: false });
        return {
          ...entity,
          title: TAREAS_CAMPUS_ES[index] || entity.title,
        };
      });
      setTasks(() => [...normalized]);
    } catch (err) {
      setError(err.message || 'Error al cargar las tareas iniciales.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadInitialTasks();
  }, [loadInitialTasks]);

  const addTask = useCallback(async (rawInput) => {
    const rawTitle = typeof rawInput === 'string' ? rawInput : rawInput?.title;
    const cleanTitle = String(rawTitle ?? '').trim();

    if (!cleanTitle) {
      const validationMsg = 'El título de la tarea no puede estar vacío ni contener solo espacios.';
      setError(validationMsg);
      return { success: false, error: validationMsg };
    }

    setIsCreating(true);
    setError(null);

    try {
      const apiResponse = await postTaskToApi({
        title: cleanTitle,
        completed: false,
        userId: 1,
      });

      const newTask = createTaskEntity(
        {
          ...apiResponse,
          title: cleanTitle,
          completed: false,
        },
        { isFromPost: true }
      );

      setTasks((prevTasks) => [...prevTasks, newTask]);
      return { success: true, task: newTask };
    } catch (err) {
      const msg = err.message || 'No se pudo crear la tarea.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsCreating(false);
    }
  }, []);

  const toggleTask = useCallback(
    async (taskId) => {
      const targetTask = tasks.find((t) => t.id === taskId);
      if (!targetTask || pendingTaskIds.includes(taskId)) {
        return { success: false };
      }

      const nextCompleted = !targetTask.completed;
      markTaskPending(taskId);
      setError(null);

      try {
        if (targetTask.remoteId && !targetTask.isLocalSession) {
          await patchTaskInApi(targetTask.remoteId, { completed: nextCompleted });
        } else if (targetTask.remoteId) {
          await patchTaskInApi(targetTask.remoteId, { completed: nextCompleted });
        }

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: nextCompleted } : task
          )
        );
        return { success: true };
      } catch (err) {
        const msg =
          err.message ||
          'Error al actualizar el estado de la tarea en el servidor.';
        setError(msg);
        return { success: false, error: msg };
      } finally {
        unmarkTaskPending(taskId);
      }
    },
    [tasks, pendingTaskIds, markTaskPending, unmarkTaskPending]
  );

  const editTask = useCallback(
    async (taskId, newRawTitle) => {
      const cleanTitle = String(newRawTitle ?? '').trim();
      if (!cleanTitle) {
        const validationMsg = 'El título editado no puede estar vacío ni contener solo espacios.';
        setError(validationMsg);
        return { success: false, error: validationMsg };
      }

      const targetTask = tasks.find((t) => t.id === taskId);
      if (!targetTask || pendingTaskIds.includes(taskId)) {
        return { success: false };
      }

      if (targetTask.title === cleanTitle) {
        return { success: true };
      }

      markTaskPending(taskId);
      setError(null);

      try {
        if (targetTask.remoteId) {
          await patchTaskInApi(targetTask.remoteId, { title: cleanTitle });
        }

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, title: cleanTitle } : task
          )
        );
        return { success: true };
      } catch (err) {
        const msg = err.message || 'No se pudo guardar el nuevo título de la tarea.';
        setError(msg);
        return { success: false, error: msg };
      } finally {
        unmarkTaskPending(taskId);
      }
    },
    [tasks, pendingTaskIds, markTaskPending, unmarkTaskPending]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      const targetTask = tasks.find((t) => t.id === taskId);
      if (!targetTask || pendingTaskIds.includes(taskId)) {
        return { success: false };
      }

      markTaskPending(taskId);
      setError(null);

      try {
        if (targetTask.remoteId) {
          await deleteTaskFromApi(targetTask.remoteId);
        }

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        return { success: true };
      } catch (err) {
        const msg = err.message || 'No se pudo eliminar la tarea.';
        setError(msg);
        return { success: false, error: msg };
      } finally {
        unmarkTaskPending(taskId);
      }
    },
    [tasks, pendingTaskIds, markTaskPending, unmarkTaskPending]
  );

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === TASK_FILTERS.ALL ||
        (statusFilter === TASK_FILTERS.PENDING && !task.completed) ||
        (statusFilter === TASK_FILTERS.COMPLETED && task.completed);

      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [tasks, statusFilter, searchQuery]);

  const summary = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const visible = filteredTasks.length;

    return {
      total,
      pending,
      completed,
      visible,
      pendientes: pending,
      completadas: completed,
      mostradas: visible,
    };
  }, [tasks, filteredTasks]);

  return {
    tasks,
    filteredTasks,
    summary,

    loading,
    error,
    isCreating,
    pendingTaskIds,
    isTaskPending,
    clearError,

    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,

    loadInitialTasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,

    tareas: tasks,
    tareasFiltradas: filteredTasks,
    resumen: summary,
    cargando: loading,
    operacionCreando: isCreating,
    filtroEstado: statusFilter,
    setFiltroEstado: setStatusFilter,
    busqueda: searchQuery,
    setBusqueda: setSearchQuery,
    cargarTareas: loadInitialTasks,
    agregarTarea: addTask,
    alternarTarea: toggleTask,
    editarTarea: editTask,
    eliminarTarea: deleteTask,
  };
};

export const useTareas = useTasks;
export default useTasks;
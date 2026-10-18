import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskSummary from "./components/TaskSummary";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilter";
import { getTareas, putTarea, deleteTarea } from "./services/TaskService";

function App() {
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  const cargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getTareas(10);
      setTareas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  
  useEffect(() => {
    const pendientesCount = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientesCount} pendientes)`;
  }, [tareas]);

  
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = tareas.filter((t) => !t.completada).length;

  const tareasFiltradas = tareas.filter((t) => {
    const coincideEstado =
      filtro === "todas" ? true :
      filtro === "pendientes" ? !t.completada :
      filtro === "completadas" ? t.completada : true;

    const textoTitulo = t.titulo || t.title || "";
    const coincideTexto = textoTitulo.toLowerCase().includes(busqueda.toLowerCase().trim());

    return coincideEstado && coincideTexto;
  });


  const handleToggleStatus = async (id) => {
    const tareaActual = tareas.find((t) => t.id === id);
    if (!tareaActual) return;

    const nuevoEstado = !tareaActual.completada;


    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: nuevoEstado } : t))
    );

    try {
      await putTarea(id, { completed: nuevoEstado });
    } catch (err) {
      console.error("Error al actualizar estado en el servidor:", err.message);
    }
  };

  
  const handleEliminarTask = async (id) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTarea(id);
    } catch (err) {
      console.error("Error al eliminar en el servidor:", err.message);
    }
  };

  return (
    <div className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />

      <TaskSummary
        total={total}
        completadas={completadas}
        pendientes={pendientes}
        mostrando={tareasFiltradas.length}
        filtroActual={filtro}
      />

      <TaskFilters
        filtro={filtro}
        onCambiarFiltro={setFiltro}
        busqueda={busqueda}
        onCambiarBusqueda={setBusqueda}
      />

      <TaskList
        title="Listado de tareas de hoy"
        tareas={tareasFiltradas}
        cargando={cargando}
        error={error}
        onToggleStatus={handleToggleStatus}
        onEliminarTask={handleEliminarTask}
      />
    </div>
  );
}

export default App;
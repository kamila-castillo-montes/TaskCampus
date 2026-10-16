import {useState} from 'react'
import './App.css'
import Header from './components/Header'
import TaskSummary from './components/TaskSummary'
import TaskList from './components/TaskList'
import TaskFilters from './components/TaskFilter.jsx'

function App() {

  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  
  const [tareas, setTareas] = useState([
    { 
      id: 1, 
      titulo: "Aprender React", 
      completada: true, 
      prioridad: "alta",
      descripcion: "Revisar los hooks useState y useEffect en TaskCampus",
      fechaEntrega: "18 Octubre"
    }, 
    { 
      id: 2, 
      titulo: "Hacer buenas tareas", 
      completada: false, 
      prioridad: "media",
      descripcion: "Completar la lógica de filtros y métricas",
      fechaEntrega: "20 Octubre"
    }
  ]);

  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = tareas.filter((t) => !t.completada).length;

  const tareasFiltradas = tareas.filter((t) => {
    const coincideE = 
      filtro === "todas" ? true :
      filtro === "pendientes" ? !t.completada :
      filtro === "completadas" ? t.completada : true;

    const textoTitulo = t.titulo || t.nombre || "";
    const coincideT = textoTitulo.toLowerCase().includes(busqueda.toLowerCase().trim());

    return coincideE && coincideT;
  });

  const handleToggleStatus = (id) => {
    setTareas(
      tareas.map((t) => 
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const handleEliminarTask = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };
  return (
    <div className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />

      {/*  Se usa encadenamiento opcional.
        Si tareas no está listo, envía 0 en vez de intentar leer tareas.length sobre undefined.
      */}

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
        onCambiarBusqueda={setBusqueda} />
      
      <TaskList 
        title="Listado de tareas de hoy" 
        tareas={tareasFiltradas} 
        onToggleStatus={handleToggleStatus} 
        onDeleteTask={handleEliminarTask}
      />
    </div>
  );
};

export default App
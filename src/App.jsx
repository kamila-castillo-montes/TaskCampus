

import './App.css'
import Header from './components/Header'
import TaskSummary from './components/TaskSummary'
import TaskList from './components/TaskList'
import useTasks from "./hooks/useTasks.jsx"

function App() {
  // Inicializamos tareas por defecto como array vacío ([]) para evitar que
  // la app se caiga mientras useTasks está en estado 'cargando' o si devuelve undefined.
  const { tareas = [], cargando = false, error = null } = useTasks() || {}

  return (
    <main className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />
      {/*  Se usa encadenamiento opcional.
        Si tareas no está listo, envía 0 en vez de intentar leer tareas.length sobre undefined.
      */}
      <TaskSummary total={tareas?.length || 0} />
      
      <TaskList 
        title="Listado de tareas de hoy" 
        tareas={tareas} 
        cargando={cargando} 
        error={error}
      />
    </main>
  )
}

export default App
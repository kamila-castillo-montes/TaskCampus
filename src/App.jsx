import './App.css'
import Header from './components/Header'
import TaskSummary from './components/TaskSummary'
import TaskList from './components/TaskList'
import useTasks from "./hooks/useTasks.jsx"

function App() {
const {tareas, cargando, error}= useTasks()
  return (
    <main className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />
      <TaskSummary total={tareas.length} />
      <TaskList title="Listado de tareas de hoy" tareas={tareas} cargando={cargando} error={error}/>
    </main>
  )
}
export default App  
import Button from "./Button";

const TaskFilters = ({ filtro = "todas", onCambiarFiltro, busqueda = "", onCambiarBusqueda }) => {
  return (
    <div className="card">

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          className="task-input"
          placeholder="Buscar tarea por título..."
          value={busqueda}
          onChange={(e) => onCambiarBusqueda(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", fontSize: "1rem", padding: "8px"}}
        />
      </div>


      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button
          label="📋 Todas"
          onClick={() => onCambiarFiltro("todas")}
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button
          label="⏳ Pendientes"
          onClick={() => onCambiarFiltro("pendientes")}
          variant={filtro === "pendientes" ? "primary" : "secondary"}
        />
        <Button
          label="✅ Completadas"
          onClick={() => onCambiarFiltro("completadas")}
          variant={filtro === "completadas" ? "primary" : "secondary"}
        />
      </div>
    </div>
  );
};

export default TaskFilters;
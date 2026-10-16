const TaskSummary = ({ 
  total = 0, 
  completadas = 0, 
  pendientes = 0, 
  mostrando = total, 
  filtroActual = "todas" 
}) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "24px",
      flexWrap: "wrap",
      padding: "8px 0"
    }}>
      
      <div style={{ textAlign: "center", minWidth: "80px" }}>
        <p style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#1d4ed8",
          margin: 0
        }}>
          {total}
        </p>

        <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
          Total
        </p>
      </div>

      <div style={{ textAlign: "center", minWidth: "80px" }}>
        <p style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#16a34a",
          margin: 0
        }}>
          {completadas}
        </p>

        <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
          Completadas
        </p>

      </div>

      <div style={{ textAlign: "center", minWidth: "80px" }}>
        <p style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#f59e0b",
          margin: 0
        }}>
          {pendientes}
        </p>

        <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
          Pendientes
        </p>
      </div>

      <div style={{ textAlign: "center", minWidth: "80px" }}>
        <p style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#0f172a",
          margin: 0
        }}>
          {mostrando}
        </p>

        <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
          Mostrando ({filtroActual})
        </p>
      </div>
    </div>
  );
};

export default TaskSummary;
function LoadingSpinner({ mensaje = "Cargando tareas..." }) {
  return (
    <div style={{ textAlign: "center", padding: "16px 0", color: "#2563eb" }}>
      <p style={{ fontWeight: "600", margin: 0 }}>⏳ {mensaje}</p>
    </div>
  );
}

export default LoadingSpinner;
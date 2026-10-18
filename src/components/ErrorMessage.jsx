function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div
      style={{
        backgroundColor: "#fee2e2",
        border: "1px solid #f87171",
        color: "#b91c1c",
        padding: "10px 14px",
        borderRadius: "8px",
        margin: "12px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span>Error: {mensaje}</span>
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          style={{
            backgroundColor: "#b91c1c",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
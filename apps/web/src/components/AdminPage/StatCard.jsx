import { S } from "./constants";

export function StatCard({ icon, label, value, color = "#ef4444" }) {
  return (
    <div
      style={{
        ...S.card,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={S.accentLine} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <div style={{ color, opacity: 0.7 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, color: "white" }}>
        {value}
      </div>
    </div>
  );
}

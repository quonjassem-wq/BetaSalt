import { motion } from "motion/react";
import { ShieldCheck, LogOut } from "lucide-react";
import { S } from "./constants";

export function DashboardHeader({ onSignOut }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        ...S.card,
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
        position: "relative",
        overflow: "hidden",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div style={S.accentLine} />
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "linear-gradient(135deg,#ef4444,#dc2626)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 24px rgba(239,68,68,0.4)",
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={24} color="white" />
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.3em",
              color: "#ef4444",
              marginBottom: 2,
            }}
          >
            SALT EXECUTOR
          </div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "white",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Control Center
          </h1>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            color: "#22c55e",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
            }}
          />
          ONLINE
        </div>
        <motion.button
          onClick={onSignOut}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
          }}
        >
          <LogOut size={14} /> Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
}

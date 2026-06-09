import { motion, AnimatePresence } from "motion/react";
import { Key, Copy, Check } from "lucide-react";
import { S } from "./constants";

export function KeysList({ generatedKeys, copiedKey, onCopyKey, onCopyAll }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      style={{ ...S.card, position: "relative", overflow: "hidden" }}
    >
      <div style={S.accentLine} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.2em",
              color: "#ef4444",
              marginBottom: 2,
            }}
          >
            OUTPUT
          </div>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: "white",
              margin: 0,
            }}
          >
            Generated Keys{" "}
            {generatedKeys.length > 0 && (
              <span style={{ color: "#ef4444" }}>({generatedKeys.length})</span>
            )}
          </h2>
        </div>
        {generatedKeys.length > 0 && (
          <motion.button
            onClick={onCopyAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 900,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444",
              cursor: "pointer",
            }}
          >
            <Copy size={13} /> COPY ALL
          </motion.button>
        )}
      </div>

      <div
        style={{ padding: 20, maxHeight: 480, overflowY: "auto" }}
        className="salt-scroll"
      >
        <AnimatePresence mode="popLayout">
          {generatedKeys.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: 280,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Key size={26} style={{ opacity: 0.2, color: "white" }} />
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: 13,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                No keys generated yet. Configure and click Generate.
              </p>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {generatedKeys.map((k, idx) => (
                <motion.div
                  key={k.key_value}
                  initial={{ opacity: 0, x: 20, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Key size={14} style={{ color: "#ef4444" }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <code
                        style={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          color: "white",
                          fontSize: 13,
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k.key_value}
                      </code>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 900,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {k.duration_days === 9999
                          ? "Permanent"
                          : `${k.duration_days} Day License`}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => onCopyKey(k.key_value)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        copiedKey === k.key_value
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(255,255,255,0.05)",
                      border: `1px solid ${copiedKey === k.key_value ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    {copiedKey === k.key_value ? (
                      <Check size={14} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy
                        size={14}
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import { motion } from "motion/react";
import { Key, RefreshCw } from "lucide-react";
import { S } from "./constants";

export function KeyGenerator({
  duration,
  setDuration,
  amount,
  setAmount,
  loading,
  onGenerate,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div
        style={{
          ...S.card,
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={S.accentLine} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(239,68,68,0.35)",
            }}
          >
            <Key size={18} color="white" />
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.2em",
                color: "#ef4444",
              }}
            >
              KEY GENERATOR
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "white" }}>
              Generate Keys
            </div>
          </div>
        </div>

        {/* Duration */}
        <div style={{ marginBottom: 20 }}>
          <label style={S.label}>Duration (Days)</label>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            {[1, 7, 30, 9999].map((d) => (
              <motion.button
                key={d}
                onClick={() => setDuration(d)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  flex: "1 1 auto",
                  padding: "8px 10px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 900,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background:
                    duration === d
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(255,255,255,0.04)",
                  borderColor:
                    duration === d
                      ? "rgba(239,68,68,0.5)"
                      : "rgba(255,255,255,0.08)",
                  color: duration === d ? "#ef4444" : "rgba(255,255,255,0.5)",
                }}
              >
                {d === 9999 ? "Perm" : `${d}d`}
              </motion.button>
            ))}
          </div>
          <input
            type="number"
            value={duration}
            min={1}
            onChange={(e) =>
              setDuration(Math.max(1, parseInt(e.target.value) || 1))
            }
            style={S.input}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(239,68,68,0.5)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.1)")
            }
          />
        </div>

        {/* Amount */}
        <div style={{ marginBottom: 28 }}>
          <label style={S.label}>Quantity</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {[1, 5, 10, 25].map((a) => (
              <motion.button
                key={a}
                onClick={() => setAmount(a)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 900,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background:
                    amount === a
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(255,255,255,0.04)",
                  borderColor:
                    amount === a
                      ? "rgba(239,68,68,0.5)"
                      : "rgba(255,255,255,0.08)",
                  color: amount === a ? "#ef4444" : "rgba(255,255,255,0.5)",
                }}
              >
                {a}
              </motion.button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            min={1}
            max={100}
            onChange={(e) =>
              setAmount(
                Math.max(1, Math.min(100, parseInt(e.target.value) || 1)),
              )
            }
            style={S.input}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(239,68,68,0.5)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.1)")
            }
          />
        </div>

        <motion.button
          onClick={onGenerate}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 14,
            fontWeight: 900,
            fontSize: 14,
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.06em",
            background: loading
              ? "rgba(239,68,68,0.3)"
              : "linear-gradient(135deg,#ef4444,#dc2626)",
            boxShadow: loading ? "none" : "0 8px 28px rgba(239,68,68,0.3)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? (
            <>
              <RefreshCw
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />{" "}
              GENERATING...
            </>
          ) : (
            <>
              <Key size={16} /> GENERATE KEYS
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

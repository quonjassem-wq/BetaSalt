import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { Toaster } from "sonner";
import { S } from "./constants";
import { LoginBackground } from "./BackgroundEffects";

export function LoginScreen({ password, setPassword, handleLogin }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "sans-serif",
      }}
    >
      <Toaster position="top-center" />
      <LoginBackground />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{
          ...S.card,
          width: "100%",
          maxWidth: 420,
          padding: "52px 44px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div style={S.accentLine} />

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            boxShadow: "0 0 40px rgba(239,68,68,0.1)",
          }}
        >
          <Lock size={32} style={{ color: "#ef4444" }} />
        </motion.div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.35em",
            color: "#ef4444",
            marginBottom: 8,
          }}
        >
          RESTRICTED ACCESS
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "white",
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
        >
          Admin Portal
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.35)",
            margin: "0 0 36px",
          }}
        >
          Authorized personnel only.
        </p>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <input
            type="password"
            placeholder="Enter admin secret key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...S.input,
              textAlign: "center",
              letterSpacing: "0.08em",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(239,68,68,0.5)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.1)")
            }
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "15px",
              borderRadius: 14,
              fontWeight: 900,
              fontSize: 14,
              color: "white",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              boxShadow: "0 8px 28px rgba(239,68,68,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            ACCESS TERMINAL
          </motion.button>
        </form>
      </motion.div>

      <style jsx global>{`body{margin:0}*{box-sizing:border-box}`}</style>
    </div>
  );
}

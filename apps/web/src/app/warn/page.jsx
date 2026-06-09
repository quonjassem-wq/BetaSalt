"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldAlert } from "lucide-react";

export default function WarnPage() {
  const [forgiven, setForgiven] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    // Lock the user here until they click sorry
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("salt_inspect_caught", "true");
    }
    const t = setTimeout(() => setShowBtn(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleSorry = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("salt_inspect_caught");
    }
    setForgiven(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  if (forgiven) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: "center", color: "white" }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <p style={{ fontSize: 18, fontWeight: 700 }}>
            Apology accepted. Redirecting...
          </p>
        </motion.div>
        <style
          jsx
          global
        >{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');body{margin:0}`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        fontFamily: "'Space Grotesk', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(239,68,68,0.3) 0%,transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px)",
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 14, stiffness: 160 }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 420,
          width: "100%",
          borderRadius: 28,
          overflow: "hidden",
          background:
            "linear-gradient(145deg,rgba(18,4,4,0.99),rgba(8,0,0,0.99))",
          border: "1px solid rgba(239,68,68,0.4)",
          boxShadow:
            "0 0 120px rgba(239,68,68,0.25),0 30px 80px rgba(0,0,0,0.9)",
        }}
      >
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg,#ef4444,#dc2626,#b91c1c)",
          }}
        />
        <div
          style={{
            padding: "48px 40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, -12, 12, -12, 12, -6, 6, 0] }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              repeat: Infinity,
              repeatDelay: 4,
            }}
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(circle,rgba(239,68,68,0.15) 0%,rgba(239,68,68,0.05) 100%)",
              border: "2px solid rgba(239,68,68,0.5)",
              boxShadow: "0 0 50px rgba(239,68,68,0.25)",
            }}
          >
            <ShieldAlert size={54} color="#ef4444" />
          </motion.div>

          {/* Text */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.4em",
                color: "#ef4444",
                marginBottom: 8,
              }}
            >
              ⚠ SECURITY ALERT ⚠
            </div>
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 20px rgba(239,68,68,0.5)",
                  "0 0 40px rgba(239,68,68,0.8)",
                  "0 0 20px rgba(239,68,68,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "white",
                margin: "0 0 12px",
                letterSpacing: "-0.02em",
              }}
            >
              Caught You.
            </motion.h1>
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#fca5a5",
                margin: "0 0 10px",
              }}
            >
              Caught you trying to get the source
            </p>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Do you want to get banned? Think twice before trying to inspect
              Salt's source code. The only way out is to apologize.
            </p>
          </div>

          {/* Sorry button */}
          <AnimateButton show={showBtn} onClick={handleSorry} />
          <p
            style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0 }}
          >
            This is the only way out.
          </p>
        </div>
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { margin: 0; } * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

function AnimateButton({ show, onClick }) {
  if (!show) return null;
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring" }}
      whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(239,68,68,0.5)" }}
      whileTap={{ scale: 0.97 }}
      style={{
        width: "100%",
        padding: "18px",
        borderRadius: 18,
        fontWeight: 900,
        fontSize: 18,
        color: "white",
        border: "none",
        cursor: "pointer",
        background: "linear-gradient(135deg,#ef4444,#dc2626,#b91c1c)",
        boxShadow: "0 8px 32px rgba(239,68,68,0.35)",
        letterSpacing: "0.04em",
      }}
    >
      🙏 I am sorry
    </motion.button>
  );
}

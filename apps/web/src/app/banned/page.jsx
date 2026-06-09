"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Ban, MessageSquare } from "lucide-react";

export default function BannedPage() {
  const [info, setInfo] = useState({
    reason: "No reason provided",
    bannedUntil: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setInfo({
        reason: params.get("reason") || "No reason provided",
        bannedUntil: params.get("until") || null,
      });
    }
  }, []);

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
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(239,68,68,0.25) 0%,transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)",
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 16 }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 480,
          width: "100%",
          borderRadius: 28,
          overflow: "hidden",
          background: "rgba(12,2,2,0.99)",
          border: "1px solid rgba(239,68,68,0.3)",
          boxShadow:
            "0 0 80px rgba(239,68,68,0.18),0 24px 60px rgba(0,0,0,0.9)",
        }}
      >
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg,#ef4444,#dc2626)",
          }}
        />

        <div
          style={{
            padding: "52px 40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(239,68,68,0.08)",
              border: "2px solid rgba(239,68,68,0.3)",
              boxShadow: "0 0 40px rgba(239,68,68,0.15)",
            }}
          >
            <Ban size={48} color="#ef4444" />
          </motion.div>

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
              ACCESS DENIED
            </div>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: "white",
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              You're Banned
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Your access to Salt Executor has been revoked by our moderation
              team.
            </p>
          </div>

          <div
            style={{
              width: "100%",
              padding: "20px 24px",
              borderRadius: 18,
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.18)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Reason</span>
              <span style={{ fontWeight: 700, color: "#fca5a5" }}>
                {info.reason}
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(239,68,68,0.15)" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Expires</span>
              <span
                style={{
                  fontWeight: 700,
                  color: info.bannedUntil ? "#fbbf24" : "#f87171",
                }}
              >
                {info.bannedUntil
                  ? new Date(info.bannedUntil).toLocaleDateString()
                  : "Permanent"}
              </span>
            </div>
          </div>

          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            If you believe this is a mistake, appeal in our Discord server.
          </p>

          <motion.a
            href="https://discord.gg/yZyHEugsPF"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 14,
              fontWeight: 900,
              fontSize: 14,
              color: "white",
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              textDecoration: "none",
              boxShadow: "0 6px 24px rgba(239,68,68,0.3)",
            }}
          >
            <MessageSquare size={18} /> Appeal in Discord
          </motion.a>
        </div>
      </motion.div>

      <style
        jsx
        global
      >{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');body{margin:0}*{box-sizing:border-box}`}</style>
    </div>
  );
}

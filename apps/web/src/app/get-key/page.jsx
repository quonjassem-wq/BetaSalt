"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../components/Navbar";
import {
  ExternalLink,
  Shield,
  MousePointer2,
  AlertCircle,
  Key,
  ShoppingCart,
  Zap,
  Check,
} from "lucide-react";

export default function GetKeyPage() {
  const [loading, setLoading] = useState(null);
  const [receivedKey, setReceivedKey] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const k = params.get("key");
      const err = params.get("error");
      if (k) setReceivedKey(k);
      if (err) console.warn("Key callback error:", err);
    }
  }, []);

  const startCheckpoint = async (provider) => {
    setLoading(provider);
    try {
      const res = await fetch("/api/keys/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("COMING SOON — Join our Discord to be notified on launch!");
        window.open("https://discord.gg/yZyHEugsPF", "_blank");
      }
    } catch {
      alert("COMING SOON — Join our Discord to be notified on launch!");
      window.open("https://discord.gg/yZyHEugsPF", "_blank");
    } finally {
      setLoading(null);
    }
  };

  const copyKey = () => {
    if (receivedKey) {
      navigator.clipboard?.writeText(receivedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const card = {
    background: "var(--surface,rgba(14,14,14,0.85))",
    border: "1px solid var(--border,rgba(255,255,255,0.07))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg,#050505)",
        color: "white",
        fontFamily: "'Space Grotesk',sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -100,
            left: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb1,rgba(239,68,68,0.1)) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          margin: "0 auto",
          padding: "140px 24px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Key received banner */}
        <AnimatePresence>
          {receivedKey && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: "100%",
                maxWidth: 600,
                marginBottom: 28,
                padding: "20px 24px",
                borderRadius: 18,
                background: "rgba(34,197,94,0.07)",
                border: "1px solid rgba(34,197,94,0.25)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(34,197,94,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check size={20} color="#22c55e" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontWeight: 900,
                    color: "#22c55e",
                    margin: "0 0 4px",
                    fontSize: 14,
                  }}
                >
                  🎉 Your key is ready!
                </p>
                <code
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    color: "white",
                    wordBreak: "break-all",
                  }}
                >
                  {receivedKey}
                </code>
              </div>
              <button
                onClick={copyKey}
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  fontWeight: 900,
                  fontSize: 12,
                  border: "1px solid rgba(34,197,94,0.3)",
                  background: copied
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(34,197,94,0.08)",
                  color: "#22c55e",
                  cursor: "pointer",
                }}
              >
                {copied ? "Copied!" : "Copy Key"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              boxShadow: "0 0 40px var(--accent-glow,rgba(239,68,68,0.3))",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src="/image.png"
              alt="Salt"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <Key
              size={32}
              color="white"
              style={{ position: "relative", zIndex: 1 }}
            />
          </motion.div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.35em",
              color: "var(--accent,#ef4444)",
              marginBottom: 10,
            }}
          >
            KEY SYSTEM
          </div>
          <h1
            style={{
              fontSize: "clamp(36px,6vw,56px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}
          >
            Get Your Key
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              height: 1,
              maxWidth: 160,
              margin: "0 auto 16px",
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p
            style={{
              color: "var(--muted,#6b7280)",
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.6,
              fontSize: 15,
            }}
          >
            Complete a quick checkpoint to get your 24-hour key. Keys are
            HWID-locked to 1 device.
          </p>
        </motion.div>

        {/* Checkpoint cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 20,
            width: "100%",
            marginBottom: 32,
          }}
        >
          {[
            {
              id: "linkvertise",
              title: "Linkvertise",
              desc: "Fast loading, secure checkpoint. Preferred option.",
              icon: <ExternalLink size={24} />,
              accentColor: "#f97316",
            },
            {
              id: "lootlabs",
              title: "Lootlabs",
              desc: "Alternative checkpoint. High reliability and quick offers.",
              icon: <MousePointer2 size={24} />,
              accentColor: "#3b82f6",
            },
          ].map((opt) => (
            <motion.button
              key={opt.id}
              onClick={() => startCheckpoint(opt.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 50px ${opt.accentColor}22`,
              }}
              whileTap={{ scale: 0.97 }}
              disabled={!!loading}
              style={{
                ...card,
                padding: 36,
                textAlign: "left",
                cursor: loading ? "not-allowed" : "pointer",
                position: "relative",
                overflow: "hidden",
                opacity: loading && loading !== opt.id ? 0.5 : 1,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg,transparent,${opt.accentColor},transparent)`,
                }}
              />
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${opt.accentColor}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  color: opt.accentColor,
                }}
              >
                {opt.icon}
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "white",
                  margin: "0 0 8px",
                }}
              >
                {opt.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted,#6b7280)",
                  margin: "0 0 24px",
                  lineHeight: 1.5,
                }}
              >
                {opt.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  color: opt.accentColor,
                }}
              >
                {loading === opt.id ? "LOADING..." : "START CHECKPOINT"}{" "}
                <ExternalLink size={12} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px",
            borderRadius: 14,
            background: "rgba(234,179,8,0.06)",
            border: "1px solid rgba(234,179,8,0.18)",
            color: "#eab308",
            fontSize: 13,
            maxWidth: 600,
            width: "100%",
            marginBottom: 32,
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>
            Keys are HWID-locked and last 24 hours. Make sure you're on the
            device you'll use Salt on.
          </span>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            ...card,
            width: "100%",
            maxWidth: 600,
            padding: "32px 36px",
            position: "relative",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.3em",
              color: "var(--accent,#ef4444)",
              marginBottom: 16,
            }}
          >
            PRICING
          </div>
          {[
            { label: "1 Day", price: "Free (Ads)" },
            { label: "1 Week", price: "$2.99" },
            { label: "30 Days", price: "$9.99" },
            { label: "Permanent", price: "$14.99" },
          ].map((tier) => (
            <div
              key={tier.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid var(--border,rgba(255,255,255,0.07))",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
                {tier.label}
              </span>
              <span
                style={{
                  fontWeight: 900,
                  color:
                    tier.price === "Free (Ads)"
                      ? "#22c55e"
                      : "var(--accent,#ef4444)",
                  fontSize: 14,
                }}
              >
                {tier.price}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Purchase Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ width: "100%", maxWidth: 600 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
              padding: "0 4px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              OR
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>
          <motion.a
            href="/purchase"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 16px 48px var(--accent-glow,rgba(239,68,68,0.35))",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
              padding: "20px 32px",
              borderRadius: 18,
              fontWeight: 900,
              fontSize: 16,
              color: "white",
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              boxShadow: "0 8px 32px var(--accent-glow,rgba(239,68,68,0.28))",
              textDecoration: "none",
              transition: "box-shadow 0.3s",
            }}
          >
            <ShoppingCart size={20} strokeWidth={2.5} />
            PURCHASE NOW
            <span style={{ fontSize: 13, opacity: 0.75, fontWeight: 600 }}>
              — Skip ads forever
            </span>
          </motion.a>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            💳 Crypto · Robux · PayPal and more — available on release
          </p>
        </motion.div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        html{scroll-behavior:smooth}body{margin:0}*{box-sizing:border-box}
      `}</style>
    </div>
  );
}

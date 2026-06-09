"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import {
  Download,
  MessageSquare,
  Zap,
  Shield,
  Cpu,
  Activity,
  ChevronRight,
  Star,
} from "lucide-react";

function useCounter(end, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const raf = (ts) => {
      if (!startTime) startTime = ts;
      const prog = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - prog, 4)) * end));
      if (prog < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [end, duration, started]);
  return count;
}

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 4500);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {glitch && (
        <>
          <span
            style={{
              position: "absolute",
              inset: 0,
              color: "#ef4444",
              opacity: 0.6,
              clipPath: "polygon(0 28%,100% 28%,100% 48%,0 48%)",
              transform: "translateX(-3px)",
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: "absolute",
              inset: 0,
              color: "#60a5fa",
              opacity: 0.4,
              clipPath: "polygon(0 56%,100% 56%,100% 76%,0 76%)",
              transform: "translateX(3px)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

function Particles() {
  const particles = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1,
      dur: Math.random() * 7 + 6,
      delay: Math.random() * 5,
      dy: Math.random() * 80 + 40,
    })),
  ).current;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.key}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--accent,#ef4444)",
          }}
          animate={{ y: [-p.dy, 0, -p.dy], opacity: [0.08, 0.4, 0.08] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);
  const unc = useCounter(100, 1800, statsStarted);
  const sunc = useCounter(98, 2000, statsStarted);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsStarted(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleDownload = () => alert("COMING SOON — JOIN OUR DISCORD!");

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
        fontFamily: "sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* Background — safe radial orbs only, no rotation */}
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
          animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            top: -200,
            left: -200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--orb1,rgba(239,68,68,0.12)) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            bottom: -100,
            right: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--orb2,rgba(127,29,29,0.1)) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "144px 24px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Particles />

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 999,
            background: "rgba(234,179,8,0.08)",
            border: "1px solid rgba(234,179,8,0.22)",
            color: "#eab308",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#eab308",
              display: "inline-block",
            }}
          />
          STATUS: ALMOST RELEASED
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            marginBottom: 32,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(80px,15vw,150px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: 0,
              marginBottom: 24,
              textShadow: "0 0 80px var(--accent-glow,rgba(239,68,68,0.35))",
            }}
          >
            <GlitchText text="SALT" />
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{
              height: 1,
              maxWidth: 280,
              margin: "0 auto 20px",
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p
            style={{
              fontSize: 18,
              color: "var(--muted,#6b7280)",
              maxWidth: 520,
              margin: "0 auto 8px",
              lineHeight: 1.6,
            }}
          >
            The next-generation Roblox executor. Fast, reliable, built by Salt
            &amp; Sugar.
          </p>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.18)",
            }}
          >
            VERSION 0.0.1
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            marginBottom: 100,
          }}
        >
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "16px 32px",
              borderRadius: 16,
              fontWeight: 900,
              fontSize: 15,
              color: "white",
              border: "none",
              cursor: "pointer",
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              boxShadow: "0 8px 32px var(--accent-glow,rgba(239,68,68,0.4))",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Download size={20} /> DOWNLOAD SALT
          </motion.button>
          <motion.a
            href="https://discord.gg/yZyHEugsPF"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "16px 32px",
              borderRadius: 16,
              fontWeight: 700,
              fontSize: 15,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              ...card,
            }}
          >
            <MessageSquare size={20} /> JOIN SALT
          </motion.a>
        </motion.div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
            width: "100%",
            maxWidth: 900,
            marginBottom: 80,
          }}
        >
          {[
            {
              icon: <Activity size={24} />,
              label: "UNC SUPPORT",
              value: `${unc}%`,
              desc: "Full compatibility with all modern scripts.",
            },
            {
              icon: <Cpu size={24} />,
              label: "sUNC SUPPORT",
              value: `${sunc}%`,
              desc: "Near-perfect support for experimental features.",
            },
            {
              icon: <Shield size={24} />,
              label: "SECURITY",
              value: "ADV",
              desc: "Built-in bypass for modern detection.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsStarted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 + 0.2 }}
              whileHover={{ y: -8 }}
              style={{
                ...card,
                padding: 32,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
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
              <div style={{ color: "var(--accent,#ef4444)", marginBottom: 16 }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  color: "white",
                  marginBottom: 4,
                  textShadow: "0 0 20px var(--accent-glow,rgba(239,68,68,0.3))",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  color: "var(--accent,#ef4444)",
                  marginBottom: 12,
                }}
              >
                {s.label}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted,#6b7280)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 16,
            width: "100%",
            maxWidth: 900,
            marginBottom: 80,
          }}
        >
          {[
            {
              icon: <Zap size={20} />,
              title: "INSTANT INJECTION",
              desc: "Lightning-fast execution with minimal overhead.",
            },
            {
              icon: <Shield size={20} />,
              title: "BYPASS SYSTEM",
              desc: "Constantly updated to stay ahead of patches.",
            },
            {
              icon: <Star size={20} />,
              title: "100% UNC",
              desc: "Full Universal Naming Convention support.",
            },
            {
              icon: <Activity size={20} />,
              title: "MULTI INSTANCE",
              desc: "Run multiple Roblox instances simultaneously.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              style={{
                ...card,
                padding: "24px 28px",
                display: "flex",
                alignItems: "flex-start",
                gap: 18,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--accent-glow,rgba(239,68,68,0.12))",
                  color: "var(--accent,#ef4444)",
                }}
              >
                {f.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: "0.14em",
                    color: "var(--accent,#ef4444)",
                    marginBottom: 4,
                  }}
                >
                  {f.title}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted,#6b7280)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon banner — NO rotation/conic gradients */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            ...card,
            width: "100%",
            maxWidth: 900,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
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
          {/* Simple pulsing glow — no rotation */}
          <motion.div
            animate={{ opacity: [0.04, 0.1, 0.04], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, var(--accent,#ef4444) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.35em",
                color: "var(--accent,#ef4444)",
                marginBottom: 12,
              }}
            >
              ⚡ DROPPING SOON ⚡
            </div>
            <h2
              style={{
                fontSize: "clamp(36px,7vw,60px)",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.02em",
                margin: "0 0 16px",
              }}
            >
              COMING SOON
            </h2>
            <p
              style={{
                color: "var(--muted,#6b7280)",
                maxWidth: 440,
                margin: "0 auto 32px",
                lineHeight: 1.6,
              }}
            >
              Salt is almost here. Be the first to know — join our Discord.
            </p>
            <motion.a
              href="https://discord.gg/yZyHEugsPF"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 32px",
                borderRadius: 16,
                fontWeight: 900,
                color: "white",
                background:
                  "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                boxShadow: "0 8px 32px var(--accent-glow,rgba(239,68,68,0.35))",
                textDecoration: "none",
              }}
            >
              <MessageSquare size={20} /> JOIN SALT DISCORD{" "}
              <ChevronRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </main>

      <footer
        style={{
          position: "relative",
          zIndex: 1,
          padding: "48px 24px",
          textAlign: "center",
          borderTop: "1px solid var(--border,rgba(255,255,255,0.07))",
          color: "var(--muted,#6b7280)",
        }}
      >
        <div
          style={{
            fontWeight: 900,
            letterSpacing: "0.2em",
            fontSize: 13,
            color: "var(--accent,#ef4444)",
            marginBottom: 6,
          }}
        >
          SALT EXECUTOR
        </div>
        <p style={{ margin: 0, fontSize: 13 }}>
          &copy; 2026 Salt Executor. All rights reserved.
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "monospace",
            fontSize: 11,
            opacity: 0.35,
          }}
        >
          v0.0.1
        </p>
      </footer>

      <style jsx global>{`
        html { scroll-behavior: smooth; box-sizing: border-box; }
        *, *::before, *::after { box-sizing: inherit; }
        ::selection { background: var(--accent-glow, rgba(239,68,68,0.3)); color: white; }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}

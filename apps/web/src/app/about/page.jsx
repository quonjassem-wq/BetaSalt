"use client";
import React from "react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar";
import { Target, Zap, Shield, Code, ExternalLink, User } from "lucide-react";

const features = [
  {
    icon: <Target size={20} />,
    title: "Our Vision",
    desc: "Provide a stable, undetected, high-performance environment for every Roblox user — free forever with ads.",
  },
  {
    icon: <Zap size={20} />,
    title: "Built for Speed",
    desc: "Zero lag, instant injection, and maximum execution efficiency right out of the box.",
  },
  {
    icon: <Shield size={20} />,
    title: "Security First",
    desc: "Our team stays ahead of patches. Always working on the latest bypasses so you stay safe.",
  },
  {
    icon: <Code size={20} />,
    title: "100% UNC",
    desc: "Full Universal Naming Convention support — your scripts run, no cut corners, no missing APIs.",
  },
];

const S = {
  card: {
    background: "var(--surface,rgba(14,14,14,0.85))",
    border: "1px solid var(--border,rgba(255,255,255,0.07))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    background:
      "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
  },
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg,#050505)",
        color: "white",
        fontFamily: "'Space Grotesk', sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* BG orbs */}
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
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -100,
            right: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb1,rgba(239,68,68,0.1)) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            bottom: 0,
            left: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb2,rgba(127,29,29,0.08)) 0%,transparent 70%)",
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
          width: "100%",
          maxWidth: 860,
          margin: "0 auto",
          padding: "140px 24px 100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64, width: "100%" }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.4em",
              color: "var(--accent,#ef4444)",
              marginBottom: 12,
            }}
          >
            WHO WE ARE
          </div>
          <h1
            style={{
              fontSize: "clamp(40px,7vw,68px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
          >
            About Salt
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              height: 1,
              width: 180,
              margin: "0 auto 20px",
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p
            style={{
              fontSize: 16,
              color: "var(--muted,#6b7280)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            A revolutionary Roblox executor built by Salt &amp; Sugar —
            powerful, free, and made for the community.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 14,
            width: "100%",
            marginBottom: 40,
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 50px var(--accent-glow,rgba(239,68,68,0.1))",
              }}
              style={{
                ...S.card,
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div style={S.accentLine} />
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "var(--accent-glow,rgba(239,68,68,0.1))",
                  color: "var(--accent,#ef4444)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                {f.title}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted,#6b7280)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Story block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            ...S.card,
            width: "100%",
            padding: "44px 40px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 28,
          }}
        >
          <div style={S.accentLine} />
          <div
            style={{
              position: "absolute",
              bottom: -14,
              right: -4,
              fontSize: 96,
              fontWeight: 900,
              color: "white",
              opacity: 0.025,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "-0.05em",
            }}
          >
            SALT
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.4em",
                color: "var(--accent,#ef4444)",
                marginBottom: 10,
              }}
            >
              THE STORY
            </div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "white",
                margin: "0 0 20px",
                letterSpacing: "-0.02em",
              }}
            >
              How Salt Began
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted,#6b7280)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                In early 2026, Salt was born from a simple idea: executors
                should be powerful <em>and</em> accessible. Led by{" "}
                <strong style={{ color: "white" }}>Salt</strong> (Owner) and{" "}
                <strong style={{ color: "white" }}>Sugar</strong> (Co-Owner), we
                saw a gap in the market for a tool combining high-end features
                with a truly free model.
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted,#6b7280)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                Our bypass team works constantly on staying ahead. Our UNC
                support is unmatched. Salt isn't just another executor — it's a
                statement of quality and dedication to the Roblox community.
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted,#6b7280)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                With 100% UNC, 98% sUNC, multi-instance support, and a
                constantly updated bypass team, Salt is ready to become the
                community's #1 choice. The wait is almost over.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Owner info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            ...S.card,
            width: "100%",
            padding: "28px 32px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={S.accentLine} />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background:
                  "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px var(--accent-glow,rgba(239,68,68,0.3))",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <img
                src="/image1.png"
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
              <User
                size={24}
                color="white"
                style={{ position: "relative", zIndex: 1 }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.3em",
                  color: "var(--accent,#ef4444)",
                  marginBottom: 2,
                }}
              >
                OWNER
              </div>
              <div style={{ fontSize: 17, fontWeight: 900, color: "white" }}>
                Salt
              </div>
              <div style={{ fontSize: 13, color: "var(--muted,#6b7280)" }}>
                Founder & Lead Developer
              </div>
            </div>
          </div>
          <motion.a
            href="/info"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 22px",
              borderRadius: 12,
              fontWeight: 900,
              fontSize: 13,
              color: "var(--accent,#ef4444)",
              background: "var(--accent-glow,rgba(239,68,68,0.1))",
              border: "1px solid var(--accent-glow,rgba(239,68,68,0.25))",
              textDecoration: "none",
            }}
          >
            <ExternalLink size={14} /> More about owner
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            width: "100%",
          }}
        >
          {[
            { val: "100%", label: "UNC" },
            { val: "98%", label: "sUNC" },
            { val: "v0.0.1", label: "VERSION" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ ...S.card, padding: "22px 12px", textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: "var(--accent,#ef4444)",
                  marginBottom: 4,
                  textShadow:
                    "0 0 20px var(--accent-glow,rgba(239,68,68,0.35))",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  color: "var(--muted,#6b7280)",
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <style
        jsx
        global
      >{`html{scroll-behavior:smooth}body{margin:0}*{box-sizing:border-box}`}</style>
    </div>
  );
}

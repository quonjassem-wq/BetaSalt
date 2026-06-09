"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar";
import { Crown, Star, Heart, ExternalLink } from "lucide-react";

const team = [
  {
    tag: "~",
    name: "Salt",
    role: "Owner",
    roleIcon: <Crown size={13} />,
    desc: "Founder & lead developer of Salt Executor. Built this from the ground up with a vision to make powerful tools free for everyone.",
    avatar: "/image1.png",
    gradient: "linear-gradient(135deg,#ef4444,rgba(239,68,68,0.5))",
    ringColor: "#ef4444",
    glowRgb: "239,68,68",
    infoLink: "/info",
  },
  {
    tag: "~",
    name: "Sugar",
    role: "Co-Owner",
    roleIcon: <Star size={13} />,
    desc: "Co-founder keeping the team sharp, the community thriving, and the updates shipping on time.",
    avatar: "/image2.png",
    gradient: "linear-gradient(135deg,#a78bfa,rgba(167,139,250,0.5))",
    ringColor: "#a78bfa",
    glowRgb: "167,139,250",
    infoLink: null,
  },
];

function Stars() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        w: Math.random() * 2.5 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        dur: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        a1: Math.random() * 0.25,
        a2: Math.random() * 0.45 + 0.1,
      })),
    );
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {items.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: s.w,
            height: s.w,
            borderRadius: "50%",
            background: "white",
          }}
          animate={{ opacity: [s.a1, s.a2, s.a1] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,var(--orb1,rgba(239,68,68,0.08)) 0%,transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export default function CreditsPage() {
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
      <Stars />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 840,
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
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              marginBottom: 20,
              background: "var(--accent-glow,rgba(239,68,68,0.1))",
              border: "1px solid var(--accent-glow,rgba(239,68,68,0.25))",
            }}
          >
            <Star size={30} style={{ color: "var(--accent,#ef4444)" }} />
          </motion.div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.4em",
              color: "var(--accent,#ef4444)",
              marginBottom: 12,
            }}
          >
            THE TEAM
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
            Credits
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              height: 1,
              width: 180,
              margin: "0 auto 16px",
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p
            style={{
              fontSize: 15,
              color: "var(--muted,#6b7280)",
              margin: "0 auto",
            }}
          >
            The minds and hands behind Salt Executor.
          </p>
        </motion.div>

        {/* Team cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 20,
            width: "100%",
            marginBottom: 40,
          }}
        >
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
              whileHover={{
                y: -10,
                boxShadow: `0 28px 70px rgba(${member.glowRgb},0.18)`,
              }}
              style={{
                padding: "40px 32px",
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                background: "var(--surface,rgba(14,14,14,0.85))",
                border: "1px solid var(--border,rgba(255,255,255,0.07))",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transition:
                  "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
              }}
            >
              {/* Top accent line uses member color */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg,transparent,${member.ringColor},transparent)`,
                }}
              />

              {/* Avatar with real image */}
              <motion.div
                whileHover={{ scale: 1.06, rotate: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 24,
                  marginBottom: 20,
                  background: member.gradient,
                  boxShadow: `0 0 40px rgba(${member.glowRgb},0.28)`,
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {/* Fallback initial */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 44,
                      fontWeight: 900,
                      color: "white",
                      textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                      zIndex: 1,
                    }}
                  >
                    {member.name[0]}
                  </span>
                </div>
                {/* Role badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: member.ringColor,
                    boxShadow: `0 4px 12px rgba(${member.glowRgb},0.4)`,
                    zIndex: 2,
                  }}
                >
                  {member.roleIcon}
                </div>
              </motion.div>

              {/* Name */}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "var(--accent,#ef4444)" }}>
                  {member.tag}{" "}
                </span>
                {member.name}
              </div>

              {/* Role badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  background: `rgba(${member.glowRgb},0.12)`,
                  border: `1px solid rgba(${member.glowRgb},0.3)`,
                  color: member.ringColor,
                }}
              >
                {member.roleIcon}
                {member.role}
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted,#6b7280)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {member.desc}
              </p>

              {/* Info link for owner */}
              {member.infoLink && (
                <motion.a
                  href={member.infoLink}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 900,
                    color: member.ringColor,
                    background: `rgba(${member.glowRgb},0.1)`,
                    border: `1px solid rgba(${member.glowRgb},0.25)`,
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink size={13} /> More info about owner
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Community note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            width: "100%",
            padding: "36px 32px",
            borderRadius: 20,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: "var(--surface,rgba(14,14,14,0.85))",
            border: "1px solid var(--border,rgba(255,255,255,0.07))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
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
          <Heart
            size={26}
            style={{ color: "var(--accent,#ef4444)", marginBottom: 12 }}
          />
          <p
            style={{
              fontWeight: 900,
              color: "white",
              margin: "0 0 4px",
              fontSize: 16,
            }}
          >
            & more contributors and supporters
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted,#6b7280)",
              margin: "0 0 24px",
            }}
          >
            in our Discord community!
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
              gap: 8,
              padding: "12px 28px",
              borderRadius: 14,
              fontWeight: 900,
              fontSize: 13,
              color: "white",
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              textDecoration: "none",
              boxShadow: "0 6px 20px var(--accent-glow,rgba(239,68,68,0.3))",
            }}
          >
            JOIN DISCORD
          </motion.a>
        </motion.div>
      </main>

      <style
        jsx
        global
      >{`html{scroll-behavior:smooth}body{margin:0}*{box-sizing:border-box}`}</style>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Twitter, Music2, Globe } from "lucide-react";

const SPOTIFY_SONG = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  link: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
  progress: 62,
  duration: "3:20",
  current: "2:04",
};

const LINKS = [
  { icon: <Globe size={18} />, label: "Salt Executor Website", href: "/" },
  {
    icon: <ExternalLink size={18} />,
    label: "Join Discord",
    href: "https://discord.gg/yZyHEugsPF",
  },
  { icon: <Twitter size={18} />, label: "Twitter / X", href: "#" },
];

export default function InfoPage() {
  const [progress, setProgress] = useState(SPOTIFY_SONG.progress);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.05));
    }, 300);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        position: "relative",
        overflow: "hidden",
        background: "#05000a",
      }}
    >
      {/* Animated bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(30px) brightness(0.3)",
            transform: "scale(1.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(5,0,10,0.6) 0%, rgba(5,0,10,0.85) 100%)",
          }}
        />
        {/* Animated accent orb */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: "-100px",
            left: "30%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(168,85,247,0.15) 0%,transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 440,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Avatar */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 28,
              overflow: "hidden",
              border: "2px solid rgba(168,85,247,0.5)",
              boxShadow: "0 0 40px rgba(168,85,247,0.3)",
              position: "relative",
            }}
          >
            <img
              src="/image.png"
              alt="Salt"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.style.background =
                  "linear-gradient(135deg,#a855f7,#7c3aed)";
              }}
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: 32,
              border: "2px solid transparent",
              borderTopColor: "rgba(168,85,247,0.8)",
              borderRightColor: "rgba(168,85,247,0.2)",
            }}
          />
        </motion.div>

        {/* Name */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "white",
              margin: "0 0 4px",
              letterSpacing: "-0.02em",
            }}
          >
            Salt
          </h1>
          <p
            style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}
          >
            Owner · Salt Executor
          </p>
        </div>

        {/* Bio */}
        <div
          style={{
            padding: "16px 22px",
            borderRadius: 18,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            Owner & lead developer of{" "}
            <strong style={{ color: "#a855f7" }}>Salt Executor</strong> —
            building the next generation of Roblox execution. Free. Fast.
            Undetected.
          </p>
        </div>

        {/* Spotify card */}
        <div
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: 18,
            background: "rgba(30,215,96,0.07)",
            border: "1px solid rgba(30,215,96,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.2em",
              color: "#1ed760",
            }}
          >
            <Music2 size={13} /> LISTENING ON SPOTIFY
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={SPOTIFY_SONG.cover}
              alt={SPOTIFY_SONG.title}
              style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <a
                href={SPOTIFY_SONG.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {SPOTIFY_SONG.title}
              </a>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                  margin: "2px 0 0",
                }}
              >
                {SPOTIFY_SONG.artist}
              </p>
            </div>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
                flexShrink: 0,
              }}
            >
              {SPOTIFY_SONG.current}
            </span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              position: "relative",
              height: 3,
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                borderRadius: 999,
                background: "#1ed760",
              }}
            />
          </div>
        </div>

        {/* Links */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {LINKS.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: "0 8px 30px rgba(168,85,247,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "15px 20px",
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 14,
                color: "white",
                textDecoration: "none",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.2s",
              }}
            >
              {link.icon} {link.label}
            </motion.a>
          ))}
        </div>

        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.2)",
            textAlign: "center",
          }}
        >
          salt executor · 2026
        </p>
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { margin: 0; } * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

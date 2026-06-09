"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../components/Navbar";
import { useTheme } from "../../components/ThemeProvider";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  User,
  Settings as SettingsIcon,
  Check,
  Palette,
  Key,
  Clock,
  HardDrive,
  Lock,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const themePreviewColors = {
  "Onyx Dark": { bg: "#050505", accent: "#ef4444" },
  "Purple Void": { bg: "#06000f", accent: "#a855f7" },
  "Ocean Blue": { bg: "#00050f", accent: "#3b82f6" },
  "Neon Green": { bg: "#000f05", accent: "#22c55e" },
  "Crimson Blood": { bg: "#0f0000", accent: "#dc2626" },
};

const S = {
  card: {
    background: "var(--surface,rgba(14,14,14,0.9))",
    border: "1px solid var(--border,rgba(255,255,255,0.07))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
  },
  card2: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
  },
  inp: {
    width: "100%",
    padding: "13px 18px",
    borderRadius: 14,
    fontSize: 14,
    fontFamily: "'Space Grotesk', monospace",
    color: "white",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    outline: "none",
    boxSizing: "border-box",
  },
  label: {
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.35)",
    marginBottom: 8,
    display: "block",
    textTransform: "uppercase",
    fontFamily: "'Space Grotesk', sans-serif",
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

const TABS = [
  { id: "check", icon: <Search size={16} />, label: "Check Key" },
  { id: "account", icon: <User size={16} />, label: "Account", locked: true },
  {
    id: "settings",
    icon: <SettingsIcon size={16} />,
    label: "Settings",
    locked: true,
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("check");
  const [tabDir, setTabDir] = useState(1);
  const [keyInput, setKeyInput] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unlockedKey, setUnlockedKey] = useState(null); // key data that unlocked tabs
  const [hwidInput, setHwidInput] = useState("");
  const [hwidMsg, setHwidMsg] = useState(null);
  const [hwidLoading, setHwidLoading] = useState(false);
  const { theme, setTheme, themeList } = useTheme() || {
    theme: "Onyx Dark",
    setTheme: () => {},
    themeList: Object.keys(themePreviewColors),
  };

  const TABS_WITH_LOCK = TABS.map((t) => ({
    ...t,
    isLocked: t.locked && !unlockedKey,
  }));

  const switchTab = (id) => {
    const ids = TABS.map((t) => t.id);
    const newDir = ids.indexOf(id) > ids.indexOf(activeTab) ? 1 : -1;
    setTabDir(newDir);
    setActiveTab(id);
  };

  const checkKey = useCallback(async () => {
    if (!keyInput.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/keys/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyValue: keyInput.trim() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStatus(data);
      if (data.valid) setUnlockedKey(data);
    } catch (err) {
      console.error(err);
      setStatus({ error: "Failed to check key. Try again." });
    } finally {
      setLoading(false);
    }
  }, [keyInput]);

  const resetHwid = useCallback(async () => {
    if (!hwidInput.trim() || !unlockedKey) return;
    setHwidLoading(true);
    setHwidMsg(null);
    try {
      const res = await fetch("/api/keys/reset-hwid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyValue: unlockedKey.key_value,
          hwid: hwidInput.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHwidMsg({
          ok: true,
          text: "HWID reset successfully! Your key can now bind to a new device.",
        });
        setUnlockedKey((prev) => ({
          ...prev,
          hwid: null,
          can_reset_hwid: false,
        }));
      } else {
        setHwidMsg({ ok: false, text: data.error || "Reset failed." });
      }
    } catch {
      setHwidMsg({ ok: false, text: "Server error. Try again." });
    } finally {
      setHwidLoading(false);
    }
  }, [hwidInput, unlockedKey]);

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
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: -80,
            right: -80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb1,rgba(239,68,68,0.08)) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            bottom: 0,
            left: -80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb2,rgba(127,29,29,0.07)) 0%,transparent 70%)",
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
          maxWidth: 1040,
          margin: "0 auto",
          padding: "112px 20px 80px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 28 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.4em",
              color: "var(--accent,#ef4444)",
              marginBottom: 4,
            }}
          >
            SALT EXECUTOR
          </div>
          <h1
            style={{
              fontSize: "clamp(28px,5vw,40px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Dashboard
          </h1>
        </motion.div>

        {/* Unlocked badge */}
        <AnimatePresence>
          {unlockedKey && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#22c55e",
                marginBottom: 20,
              }}
            >
              <ShieldCheck size={14} /> Key verified — Account & Settings
              unlocked
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Sidebar + Panel row */}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ ...S.card, padding: 8, width: 220, flexShrink: 0 }}
            >
              {TABS_WITH_LOCK.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => !tab.isLocked && switchTab(tab.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    cursor: tab.isLocked ? "not-allowed" : "pointer",
                    border:
                      activeTab === tab.id
                        ? "1px solid var(--accent-glow,rgba(239,68,68,0.25))"
                        : "1px solid transparent",
                    background:
                      activeTab === tab.id
                        ? "var(--accent-glow,rgba(239,68,68,0.1))"
                        : "transparent",
                    color: tab.isLocked
                      ? "rgba(255,255,255,0.25)"
                      : activeTab === tab.id
                        ? "var(--accent,#ef4444)"
                        : "rgba(255,255,255,0.6)",
                    transition: "all 0.2s",
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    {tab.icon}
                    {tab.label}
                  </span>
                  {tab.isLocked && <Lock size={12} style={{ opacity: 0.5 }} />}
                </button>
              ))}
              {!unlockedKey && (
                <div
                  style={{
                    margin: "10px 4px 4px",
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: "rgba(234,179,8,0.06)",
                    border: "1px solid rgba(234,179,8,0.15)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(234,179,8,0.8)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>Verify your key</strong> in Check Key to unlock all
                    tabs.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Main Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{
                ...S.card,
                flex: 1,
                minWidth: 0,
                minHeight: 420,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={S.accentLine} />

              <AnimatePresence mode="wait" custom={tabDir}>
                {/* CHECK KEY */}
                {activeTab === "check" && (
                  <motion.div
                    key="check"
                    custom={tabDir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{ padding: "32px 28px" }}
                  >
                    <div style={{ marginBottom: 28 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 900,
                          letterSpacing: "0.3em",
                          color: "var(--accent,#ef4444)",
                          marginBottom: 6,
                        }}
                      >
                        KEY VERIFICATION
                      </div>
                      <h2
                        style={{
                          fontSize: 22,
                          fontWeight: 900,
                          color: "white",
                          margin: "0 0 6px",
                        }}
                      >
                        Check Your Key
                      </h2>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--muted,#6b7280)",
                          margin: 0,
                        }}
                      >
                        Enter your Salt key to verify status. A valid key also
                        unlocks Account and Settings tabs.
                      </p>
                    </div>

                    {/* Input row */}
                    <div style={{ position: "relative", marginBottom: 16 }}>
                      <input
                        placeholder="SALT-XXXXXXXXXXXXXXXX"
                        value={keyInput}
                        onChange={(e) =>
                          setKeyInput(e.target.value.toUpperCase())
                        }
                        onKeyDown={(e) => e.key === "Enter" && checkKey()}
                        style={{ ...S.inp, paddingRight: 110 }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent,#ef4444)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                      <motion.button
                        onClick={checkKey}
                        disabled={loading || !keyInput.trim()}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          position: "absolute",
                          right: 6,
                          top: 6,
                          bottom: 6,
                          padding: "0 18px",
                          borderRadius: 10,
                          fontWeight: 900,
                          fontSize: 13,
                          color: "white",
                          border: "none",
                          cursor:
                            loading || !keyInput.trim()
                              ? "not-allowed"
                              : "pointer",
                          background:
                            "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                          opacity: loading || !keyInput.trim() ? 0.5 : 1,
                        }}
                      >
                        {loading ? "..." : "VERIFY"}
                      </motion.button>
                    </div>

                    {/* Status result */}
                    <AnimatePresence>
                      {status && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            padding: "20px 22px",
                            borderRadius: 14,
                            marginBottom: 16,
                            background: status.valid
                              ? "rgba(34,197,94,0.07)"
                              : "rgba(239,68,68,0.07)",
                            border: `1px solid ${status.valid ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 14,
                            }}
                          >
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                background: status.valid
                                  ? "rgba(34,197,94,0.14)"
                                  : "rgba(239,68,68,0.14)",
                              }}
                            >
                              {status.valid ? (
                                <ShieldCheck size={20} color="#22c55e" />
                              ) : (
                                <ShieldAlert size={20} color="#ef4444" />
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p
                                style={{
                                  fontWeight: 900,
                                  fontSize: 15,
                                  color: "white",
                                  margin: "0 0 8px",
                                }}
                              >
                                {status.valid
                                  ? "✅ Key Active & Verified"
                                  : status.error || "❌ Key Invalid or Expired"}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 5,
                                }}
                              >
                                {status.expires_at && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      fontSize: 12,
                                      color: "var(--muted,#6b7280)",
                                    }}
                                  >
                                    <Clock size={12} /> Expires:{" "}
                                    {new Date(
                                      status.expires_at,
                                    ).toLocaleString()}
                                  </div>
                                )}
                                {status.hwid && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      fontSize: 12,
                                      color: "var(--muted,#6b7280)",
                                    }}
                                  >
                                    <HardDrive size={12} /> HWID:{" "}
                                    {status.hwid.substring(0, 20)}...
                                  </div>
                                )}
                                {status.next_hwid_reset && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      fontSize: 12,
                                      color: "var(--muted,#6b7280)",
                                    }}
                                  >
                                    <RefreshCw size={12} /> Next HWID reset:{" "}
                                    {new Date(
                                      status.next_hwid_reset,
                                    ).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                              {status.valid && (
                                <div
                                  style={{
                                    marginTop: 10,
                                    fontSize: 12,
                                    color: "#22c55e",
                                    fontWeight: 700,
                                  }}
                                >
                                  🔓 Account & Settings tabs are now unlocked!
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div style={{ ...S.card2, padding: "14px 18px" }}>
                      <p
                        style={{
                          fontSize: 12,
                          color: "var(--muted,#6b7280)",
                          margin: "0 0 4px",
                        }}
                      >
                        Don't have a key?
                      </p>
                      <a
                        href="/get-key"
                        style={{
                          fontSize: 13,
                          fontWeight: 900,
                          color: "var(--accent,#ef4444)",
                          textDecoration: "none",
                        }}
                      >
                        Get your free key →
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* ACCOUNT — locked unless key verified */}
                {activeTab === "account" && (
                  <motion.div
                    key="account"
                    custom={tabDir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{ padding: "32px 28px" }}
                  >
                    <div style={{ marginBottom: 28 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 900,
                          letterSpacing: "0.3em",
                          color: "var(--accent,#ef4444)",
                          marginBottom: 6,
                        }}
                      >
                        ACCOUNT
                      </div>
                      <h2
                        style={{
                          fontSize: 22,
                          fontWeight: 900,
                          color: "white",
                          margin: "0 0 6px",
                        }}
                      >
                        Your Account
                      </h2>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--muted,#6b7280)",
                          margin: 0,
                        }}
                      >
                        Profile, username and key binding — coming soon.
                      </p>
                    </div>

                    <div
                      style={{
                        ...S.card2,
                        padding: "44px 28px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 18,
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "var(--accent-glow,rgba(239,68,68,0.1))",
                          border:
                            "1px solid var(--accent-glow,rgba(239,68,68,0.2))",
                          boxShadow:
                            "0 0 30px var(--accent-glow,rgba(239,68,68,0.1))",
                        }}
                      >
                        <User
                          size={32}
                          style={{ color: "var(--accent,#ef4444)" }}
                        />
                      </motion.div>
                      <div>
                        <p
                          style={{
                            fontWeight: 900,
                            fontSize: 16,
                            color: "white",
                            margin: "0 0 6px",
                          }}
                        >
                          Coming Soon
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--muted,#6b7280)",
                            margin: 0,
                            lineHeight: 1.6,
                            maxWidth: 320,
                          }}
                        >
                          Account linking, profile customization, and key
                          binding are being built. Stay tuned in Discord.
                        </p>
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 18px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          background: "rgba(234,179,8,0.08)",
                          border: "1px solid rgba(234,179,8,0.2)",
                          color: "#eab308",
                        }}
                      >
                        <motion.span
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "#eab308",
                            display: "inline-block",
                          }}
                        />
                        IN DEVELOPMENT
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SETTINGS */}
                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    custom={tabDir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{ padding: "32px 28px" }}
                  >
                    <div style={{ marginBottom: 28 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 900,
                          letterSpacing: "0.3em",
                          color: "var(--accent,#ef4444)",
                          marginBottom: 6,
                        }}
                      >
                        PERSONALIZATION
                      </div>
                      <h2
                        style={{
                          fontSize: 22,
                          fontWeight: 900,
                          color: "white",
                          margin: "0 0 6px",
                        }}
                      >
                        Theme & Settings
                      </h2>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--muted,#6b7280)",
                          margin: 0,
                        }}
                      >
                        Choose a theme and manage your HWID.
                      </p>
                    </div>

                    {/* Theme picker */}
                    <div style={{ marginBottom: 32 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 14,
                        }}
                      >
                        <Palette
                          size={15}
                          style={{ color: "var(--accent,#ef4444)" }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 900,
                            color: "white",
                          }}
                        >
                          Color Theme
                        </span>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill,minmax(150px,1fr))",
                          gap: 10,
                        }}
                      >
                        {(themeList || []).map((t) => {
                          const p = themePreviewColors[t] || {
                            bg: "#050505",
                            accent: "#ef4444",
                          };
                          const isActive = theme === t;
                          return (
                            <motion.button
                              key={t}
                              onClick={() => setTheme(t)}
                              whileHover={{ scale: 1.04, y: -3 }}
                              whileTap={{ scale: 0.96 }}
                              style={{
                                padding: "14px 14px",
                                borderRadius: 14,
                                textAlign: "left",
                                cursor: "pointer",
                                background: isActive
                                  ? "var(--accent-glow,rgba(239,68,68,0.1))"
                                  : "rgba(255,255,255,0.03)",
                                border: isActive
                                  ? "1px solid var(--accent,#ef4444)"
                                  : "1px solid rgba(255,255,255,0.07)",
                                boxShadow: isActive
                                  ? "0 0 18px var(--accent-glow,rgba(239,68,68,0.12))"
                                  : "none",
                                transition: "all 0.2s",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  height: 36,
                                  borderRadius: 8,
                                  marginBottom: 10,
                                  background: p.bg,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 6,
                                }}
                              >
                                <div
                                  style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: p.accent,
                                    boxShadow: `0 0 8px ${p.accent}99`,
                                  }}
                                />
                                <div
                                  style={{
                                    width: 20,
                                    height: 3,
                                    borderRadius: 3,
                                    background: p.accent,
                                    opacity: 0.4,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 900,
                                    color: "white",
                                  }}
                                >
                                  {t}
                                </span>
                                {isActive && (
                                  <Check
                                    size={11}
                                    style={{ color: "var(--accent,#ef4444)" }}
                                  />
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* HWID Reset */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 14,
                        }}
                      >
                        <RefreshCw
                          size={15}
                          style={{ color: "var(--accent,#ef4444)" }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 900,
                            color: "white",
                          }}
                        >
                          HWID Reset
                        </span>
                      </div>

                      {unlockedKey && (
                        <div
                          style={{
                            ...S.card2,
                            padding: "18px 20px",
                            marginBottom: 14,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 6,
                              fontSize: 13,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span style={{ color: "var(--muted,#6b7280)" }}>
                                Reset interval
                              </span>
                              <span style={{ fontWeight: 700, color: "white" }}>
                                {unlockedKey.hwid_reset_days || 7} days
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span style={{ color: "var(--muted,#6b7280)" }}>
                                Next reset available
                              </span>
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: unlockedKey.can_reset_hwid
                                    ? "#22c55e"
                                    : "var(--muted,#6b7280)",
                                }}
                              >
                                {unlockedKey.can_reset_hwid
                                  ? "Now!"
                                  : new Date(
                                      unlockedKey.next_hwid_reset,
                                    ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <p
                        style={{
                          fontSize: 12,
                          color: "var(--muted,#6b7280)",
                          margin: "0 0 10px",
                          lineHeight: 1.6,
                        }}
                      >
                        Enter your current HWID to reset it. This allows your
                        key to bind to a new device. Resets are limited by your
                        key's reset interval.
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input
                          placeholder="Your current HWID"
                          value={hwidInput}
                          onChange={(e) => setHwidInput(e.target.value)}
                          style={{ ...S.inp, flex: 1 }}
                          onFocus={(e) =>
                            (e.target.style.borderColor =
                              "var(--accent,#ef4444)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor =
                              "rgba(255,255,255,0.1)")
                          }
                        />
                        <motion.button
                          onClick={resetHwid}
                          disabled={
                            hwidLoading ||
                            !hwidInput.trim() ||
                            !unlockedKey ||
                            !unlockedKey.can_reset_hwid
                          }
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            padding: "0 20px",
                            borderRadius: 12,
                            fontWeight: 900,
                            fontSize: 13,
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            background:
                              "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                            opacity:
                              !unlockedKey || !unlockedKey.can_reset_hwid
                                ? 0.4
                                : 1,
                          }}
                        >
                          {hwidLoading ? "..." : "RESET"}
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {hwidMsg && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                              marginTop: 12,
                              padding: "12px 16px",
                              borderRadius: 12,
                              fontSize: 13,
                              fontWeight: 600,
                              background: hwidMsg.ok
                                ? "rgba(34,197,94,0.08)"
                                : "rgba(239,68,68,0.08)",
                              border: `1px solid ${hwidMsg.ok ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
                              color: hwidMsg.ok ? "#22c55e" : "#f87171",
                            }}
                          >
                            {hwidMsg.ok ? "✅ " : "❌ "}
                            {hwidMsg.text}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; } body { margin: 0; } * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

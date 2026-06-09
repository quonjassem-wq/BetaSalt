"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Key,
  Copy,
  Lock,
  LogOut,
  Clock,
  Zap,
  Activity,
  Check,
  RefreshCw,
  Globe,
  Ban,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Hash,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const ADMIN_PASS = "SALTY-WAS-HEREWITHSUGAR_ezez.meow.ez.kidd_keno";
const LOGS_PER_PAGE = 20;

const S = {
  card: {
    background: "rgba(14,14,14,0.9)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
  },
  inp: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 13,
    color: "white",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    outline: "none",
    fontFamily: "monospace",
    boxSizing: "border-box",
  },
  label: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.3)",
    marginBottom: 7,
    display: "block",
    textTransform: "uppercase",
  },
  accent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    background: "linear-gradient(90deg,transparent,#ef4444,transparent)",
  },
};

function t2(msg, ok = true) {
  const base = {
    background: "#0a0a0a",
    border: `1px solid rgba(${ok ? "34,197,94" : "239,68,68"},0.3)`,
    color: "white",
  };
  ok ? toast.success(msg, { style: base }) : toast.error(msg, { style: base });
}

function qs(active, val, color) {
  return {
    flex: 1,
    padding: "8px 0",
    borderRadius: 9,
    fontSize: 12,
    fontWeight: 900,
    border: "1px solid",
    cursor: "pointer",
    background: active ? `rgba(${color},0.15)` : "rgba(255,255,255,0.04)",
    borderColor: active ? `rgba(${color},0.5)` : "rgba(255,255,255,0.08)",
    color: active ? `rgb(${color})` : "rgba(255,255,255,0.5)",
  };
}

const TABS = [
  { id: "gen", icon: <Key size={14} />, label: "Key Generator" },
  { id: "logs", icon: <Globe size={14} />, label: "IP Logs" },
  { id: "bans", icon: <Ban size={14} />, label: "Ban Manager" },
];

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [auth, setAuth] = useState(false);
  const [tab, setTab] = useState("gen");

  // keygen
  const [dur, setDur] = useState(1);
  const [amt, setAmt] = useState(1);
  const [maxH, setMaxH] = useState(1);
  const [hReset, setHReset] = useState(7);
  const [noteField, setNoteField] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [keys, setKeys] = useState([]);
  const [copied, setCopied] = useState(null);

  // logs
  const [logs, setLogs] = useState([]);
  const [logsLoad, setLogsLoad] = useState(false);
  const [logPage, setLogPage] = useState(0);

  // bans
  const [bans, setBans] = useState([]);
  const [bansLoad, setBansLoad] = useState(false);
  const [banType, setBanType] = useState("ip");
  const [banVal, setBanVal] = useState("");
  const [banReason, setBanReason] = useState("");
  const [banUntil, setBanUntil] = useState("");

  const login = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASS) {
      setAuth(true);
      t2("Welcome back, Salt.");
    } else t2("Invalid admin key.", false);
  };

  const generate = useCallback(async () => {
    if (genLoading) return;
    setGenLoading(true);
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: pw,
          duration: dur,
          amount: amt,
          max_hwids: maxH,
          hwid_reset_days: hReset,
          note: noteField || null,
        }),
      });
      const data = await res.json();
      if (data.keys) {
        setKeys(data.keys);
        t2(`Generated ${amt} key${amt > 1 ? "s" : ""} ✓`);
      } else t2(data.error || "Failed.", false);
    } catch {
      t2("Server error.", false);
    } finally {
      setGenLoading(false);
    }
  }, [pw, dur, amt, maxH, hReset, noteField, genLoading]);

  const copyKey = (k) => {
    navigator.clipboard?.writeText(k);
    setCopied(k);
    setTimeout(() => setCopied(null), 1800);
    t2("Copied!");
  };
  const copyAll = () => {
    navigator.clipboard?.writeText(keys.map((k) => k.key_value).join("\n"));
    t2("All keys copied!");
  };

  const fetchLogs = useCallback(async () => {
    setLogsLoad(true);
    try {
      const r = await fetch(
        `/api/admin/logs?password=${encodeURIComponent(ADMIN_PASS)}`,
      );
      const d = await r.json();
      if (d.logs) setLogs(d.logs);
    } catch {
      t2("Failed to fetch logs.", false);
    } finally {
      setLogsLoad(false);
    }
  }, []);

  const fetchBans = useCallback(async () => {
    setBansLoad(true);
    try {
      const r = await fetch(
        `/api/admin/ban?password=${encodeURIComponent(ADMIN_PASS)}`,
      );
      const d = await r.json();
      if (d.bans) setBans(d.bans);
    } catch {
      t2("Failed to fetch bans.", false);
    } finally {
      setBansLoad(false);
    }
  }, []);

  const addBan = async () => {
    if (!banVal.trim()) return;
    try {
      const r = await fetch("/api/admin/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: ADMIN_PASS,
          type: banType,
          value: banVal.trim(),
          reason: banReason,
          banned_until: banUntil || null,
        }),
      });
      const d = await r.json();
      if (d.banned) {
        t2("Banned!");
        setBanVal("");
        setBanReason("");
        setBanUntil("");
        fetchBans();
      } else t2(d.error || "Failed.", false);
    } catch {
      t2("Server error.", false);
    }
  };

  const removeBan = async (value) => {
    try {
      const r = await fetch("/api/admin/ban", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ADMIN_PASS, value }),
      });
      const d = await r.json();
      if (d.success) {
        t2("Ban removed.");
        fetchBans();
      }
    } catch {
      t2("Server error.", false);
    }
  };

  useEffect(() => {
    if (!auth) return;
    if (tab === "logs") fetchLogs();
    if (tab === "bans") fetchBans();
  }, [tab, auth]);

  const pagedLogs = logs.slice(
    logPage * LOGS_PER_PAGE,
    (logPage + 1) * LOGS_PER_PAGE,
  );

  // ─── LOGIN ────────────────────────────────────────────────────────────────
  if (!auth)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "'Space Grotesk',sans-serif",
        }}
      >
        <Toaster position="top-center" />
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(239,68,68,0.07) 0%,transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          style={{
            ...S.card,
            width: "100%",
            maxWidth: 400,
            padding: "44px 36px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <div style={S.accent} />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              boxShadow: "0 0 40px rgba(239,68,68,0.3)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src="/image.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <Lock
              size={30}
              color="white"
              style={{ position: "relative", zIndex: 1 }}
            />
          </motion.div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.35em",
              color: "#ef4444",
              marginBottom: 6,
            }}
          >
            RESTRICTED
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "white",
              margin: "0 0 6px",
            }}
          >
            Admin Portal
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
              margin: "0 0 28px",
            }}
          >
            Authorized personnel only.
          </p>
          <form
            onSubmit={login}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <input
              type="password"
              placeholder="Enter admin key"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={{ ...S.inp, textAlign: "center" }}
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
                padding: "14px",
                borderRadius: 12,
                fontWeight: 900,
                fontSize: 14,
                color: "white",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#ef4444,#dc2626)",
                boxShadow: "0 8px 28px rgba(239,68,68,0.3)",
              }}
            >
              ACCESS TERMINAL
            </motion.button>
          </form>
        </motion.div>
        <style
          jsx
          global
        >{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');body{margin:0}*{box-sizing:border-box}`}</style>
      </div>
    );

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        fontFamily: "'Space Grotesk',sans-serif",
        overflowX: "hidden",
      }}
    >
      <Toaster position="top-right" />
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
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -200,
            left: -200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(239,68,68,0.1) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1300,
          margin: "0 auto",
          padding: "24px 20px 80px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            ...S.card,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            position: "relative",
            overflow: "hidden",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={S.accent} />
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "linear-gradient(135deg,#ef4444,#dc2626)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src="/image.png"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
              <ShieldCheck
                size={20}
                color="white"
                style={{ position: "relative", zIndex: 1 }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: "0.28em",
                  color: "#ef4444",
                }}
              >
                SALT EXECUTOR
              </div>
              <div style={{ fontSize: 17, fontWeight: 900, color: "white" }}>
                Control Center
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#22c55e",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              ONLINE
            </div>
            <button
              onClick={() => {
                setAuth(false);
                setKeys([]);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.55)",
                cursor: "pointer",
              }}
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[
            {
              label: "Generated",
              val: keys.length,
              icon: <Zap size={14} />,
              color: "#22c55e",
            },
            {
              label: "IP Logs",
              val: logs.length || "--",
              icon: <Globe size={14} />,
              color: "#ef4444",
            },
            {
              label: "Bans",
              val: bans.length || "--",
              icon: <Ban size={14} />,
              color: "#f59e0b",
            },
            {
              label: "Status",
              val: "Online",
              icon: <Activity size={14} />,
              color: "#22c55e",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                ...S.card,
                padding: "16px 18px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={S.accent} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </span>
                <span style={{ color: s.color, opacity: 0.7 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "white" }}>
                {s.val}
              </div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 16px",
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                border: "1px solid",
                transition: "all 0.2s",
                background:
                  tab === t.id
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(255,255,255,0.03)",
                borderColor:
                  tab === t.id
                    ? "rgba(239,68,68,0.4)"
                    : "rgba(255,255,255,0.07)",
                color: tab === t.id ? "#ef4444" : "rgba(255,255,255,0.5)",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {/* KEY GENERATOR */}
          {tab === "gen" && (
            <motion.div
              key="gen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ display: "grid", gap: 18, alignItems: "start" }}
              className="admin-grid"
            >
              {/* Left */}
              <div
                style={{
                  ...S.card,
                  padding: "26px 22px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={S.accent} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    marginBottom: 22,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "linear-gradient(135deg,#ef4444,#dc2626)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Key size={16} color="white" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: "0.2em",
                        color: "#ef4444",
                      }}
                    >
                      GENERATOR
                    </div>
                    <div
                      style={{ fontSize: 14, fontWeight: 900, color: "white" }}
                    >
                      Key Settings
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Duration (Days)</label>
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      flexWrap: "wrap",
                      marginBottom: 7,
                    }}
                  >
                    {[1, 7, 30, 9999].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDur(d)}
                        style={{
                          ...qs(dur === d, d, "239,68,68"),
                          flex: "1 1 auto",
                        }}
                      >
                        {d === 9999 ? "Perm" : `${d}d`}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={dur}
                    min={1}
                    onChange={(e) =>
                      setDur(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    style={S.inp}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* Quantity */}
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Quantity</label>
                  <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                    {[1, 5, 10, 25].map((a) => (
                      <button
                        key={a}
                        onClick={() => setAmt(a)}
                        style={qs(amt === a, a, "239,68,68")}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={amt}
                    min={1}
                    max={100}
                    onChange={(e) =>
                      setAmt(
                        Math.max(
                          1,
                          Math.min(100, parseInt(e.target.value) || 1),
                        ),
                      )
                    }
                    style={S.inp}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* Max HWIDs */}
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Max HWIDs</label>
                  <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                    {[1, 2, 5, 10].map((h) => (
                      <button
                        key={h}
                        onClick={() => setMaxH(h)}
                        style={qs(maxH === h, h, "59,130,246")}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={maxH}
                    min={1}
                    onChange={(e) =>
                      setMaxH(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    style={S.inp}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(59,130,246,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* HWID Reset Days */}
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>HWID Reset Interval (Days)</label>
                  <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                    {[1, 7, 14, 30].map((r) => (
                      <button
                        key={r}
                        onClick={() => setHReset(r)}
                        style={qs(hReset === r, r, "168,85,247")}
                      >
                        {r}d
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={hReset}
                    min={1}
                    onChange={(e) =>
                      setHReset(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    style={S.inp}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(168,85,247,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* Note */}
                <div style={{ marginBottom: 22 }}>
                  <label style={S.label}>Note (optional)</label>
                  <input
                    value={noteField}
                    onChange={(e) => setNoteField(e.target.value)}
                    placeholder="e.g. beta tester, staff..."
                    style={S.inp}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                <motion.button
                  onClick={generate}
                  disabled={genLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    fontWeight: 900,
                    fontSize: 14,
                    color: "white",
                    border: "none",
                    cursor: genLoading ? "not-allowed" : "pointer",
                    background: genLoading
                      ? "rgba(239,68,68,0.3)"
                      : "linear-gradient(135deg,#ef4444,#dc2626)",
                    boxShadow: genLoading
                      ? "none"
                      : "0 8px 28px rgba(239,68,68,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {genLoading ? (
                    <>
                      <RefreshCw
                        size={14}
                        style={{ animation: "spin 1s linear infinite" }}
                      />{" "}
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Key size={14} /> GENERATE KEYS
                    </>
                  )}
                </motion.button>
              </div>

              {/* Right: key list */}
              <div
                style={{ ...S.card, position: "relative", overflow: "hidden" }}
              >
                <div style={S.accent} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: "0.2em",
                        color: "#ef4444",
                        marginBottom: 2,
                      }}
                    >
                      OUTPUT
                    </div>
                    <div
                      style={{ fontSize: 15, fontWeight: 900, color: "white" }}
                    >
                      Keys{" "}
                      {keys.length > 0 && (
                        <span style={{ color: "#ef4444" }}>
                          ({keys.length})
                        </span>
                      )}
                    </div>
                  </div>
                  {keys.length > 0 && (
                    <button
                      onClick={copyAll}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "7px 13px",
                        borderRadius: 9,
                        fontSize: 12,
                        fontWeight: 900,
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#ef4444",
                        cursor: "pointer",
                      }}
                    >
                      <Copy size={12} /> ALL
                    </button>
                  )}
                </div>
                <div
                  style={{ padding: 14, maxHeight: 500, overflowY: "auto" }}
                  className="salt-scroll"
                >
                  {keys.length === 0 ? (
                    <div
                      style={{
                        height: 240,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        color: "rgba(255,255,255,0.2)",
                      }}
                    >
                      <Key size={26} style={{ opacity: 0.2 }} />
                      <p
                        style={{ fontSize: 13, margin: 0, fontStyle: "italic" }}
                      >
                        No keys yet.
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {keys.map((k, i) => (
                        <motion.div
                          key={k.key_value}
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "11px 14px",
                            borderRadius: 11,
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 9,
                              background: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Key size={13} style={{ color: "#ef4444" }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <code
                              style={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "white",
                                fontSize: 12,
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {k.key_value}
                            </code>
                            <span
                              style={{
                                fontSize: 10,
                                color: "rgba(255,255,255,0.28)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {k.duration_days === 9999
                                ? "Perm"
                                : `${k.duration_days}d`}{" "}
                              · {k.max_hwids || 1}H · R:{k.hwid_reset_days || 7}
                              d{k.note ? ` · ${k.note}` : ""}
                            </span>
                          </div>
                          <button
                            onClick={() => copyKey(k.key_value)}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                copied === k.key_value
                                  ? "rgba(34,197,94,0.15)"
                                  : "rgba(255,255,255,0.05)",
                              border: `1px solid ${copied === k.key_value ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.07)"}`,
                              cursor: "pointer",
                            }}
                          >
                            {copied === k.key_value ? (
                              <Check size={12} style={{ color: "#22c55e" }} />
                            ) : (
                              <Copy
                                size={12}
                                style={{ color: "rgba(255,255,255,0.4)" }}
                              />
                            )}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* IP LOGS */}
          {tab === "logs" && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ ...S.card, position: "relative", overflow: "hidden" }}
            >
              <div style={S.accent} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 22px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: "0.2em",
                      color: "#ef4444",
                      marginBottom: 2,
                    }}
                  >
                    MONITORING
                  </div>
                  <div
                    style={{ fontSize: 15, fontWeight: 900, color: "white" }}
                  >
                    IP Logs{" "}
                    <span style={{ color: "#ef4444" }}>({logs.length})</span>
                  </div>
                </div>
                <button
                  onClick={fetchLogs}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "7px 13px",
                    borderRadius: 9,
                    fontSize: 12,
                    fontWeight: 900,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#ef4444",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              {logsLoad ? (
                <div
                  style={{
                    padding: 48,
                    textAlign: "center",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  Loading...
                </div>
              ) : logs.length === 0 ? (
                <div
                  style={{
                    padding: 60,
                    textAlign: "center",
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  <FileText
                    size={30}
                    style={{
                      margin: "0 auto 10px",
                      display: "block",
                      opacity: 0.2,
                    }}
                  />
                  <p style={{ margin: 0, fontSize: 13 }}>No logs yet.</p>
                </div>
              ) : (
                <>
                  <div style={{ overflowX: "auto" }} className="salt-scroll">
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: 12,
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {["IP", "Page", "Key", "HWID", "Agent", "Time"].map(
                            (h) => (
                              <th
                                key={h}
                                style={{
                                  padding: "10px 14px",
                                  textAlign: "left",
                                  fontWeight: 900,
                                  fontSize: 10,
                                  letterSpacing: "0.14em",
                                  color: "rgba(255,255,255,0.3)",
                                  textTransform: "uppercase",
                                }}
                              >
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {pagedLogs.map((log, i) => (
                          <tr
                            key={log.id}
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,0.04)",
                              background:
                                i % 2 === 0
                                  ? "rgba(255,255,255,0.01)"
                                  : "transparent",
                            }}
                          >
                            <td
                              style={{
                                padding: "9px 14px",
                                color: "#60a5fa",
                                fontFamily: "monospace",
                              }}
                            >
                              {log.ip_address}
                            </td>
                            <td
                              style={{
                                padding: "9px 14px",
                                color: "rgba(255,255,255,0.55)",
                              }}
                            >
                              {log.page || "/"}
                            </td>
                            <td
                              style={{
                                padding: "9px 14px",
                                color: "rgba(255,255,255,0.45)",
                                maxWidth: 120,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontFamily: "monospace",
                              }}
                            >
                              {log.key_value || "—"}
                            </td>
                            <td
                              style={{
                                padding: "9px 14px",
                                color: "rgba(255,255,255,0.35)",
                                maxWidth: 100,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontFamily: "monospace",
                              }}
                            >
                              {log.hwid ? log.hwid.substring(0, 10) + "…" : "—"}
                            </td>
                            <td
                              style={{
                                padding: "9px 14px",
                                color: "rgba(255,255,255,0.25)",
                                maxWidth: 160,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {log.user_agent
                                ? log.user_agent.substring(0, 28) + "…"
                                : "—"}
                            </td>
                            <td
                              style={{
                                padding: "9px 14px",
                                color: "rgba(255,255,255,0.35)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {log.visited_at
                                ? new Date(log.visited_at).toLocaleString()
                                : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {logs.length > LOGS_PER_PAGE && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        padding: "14px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <button
                        onClick={() => setLogPage((p) => Math.max(0, p - 1))}
                        disabled={logPage === 0}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 7,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.04)",
                          color: "white",
                          cursor: logPage === 0 ? "not-allowed" : "pointer",
                          opacity: logPage === 0 ? 0.4 : 1,
                        }}
                      >
                        <ChevronLeft size={13} />
                      </button>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        Page {logPage + 1}/
                        {Math.ceil(logs.length / LOGS_PER_PAGE)}
                      </span>
                      <button
                        onClick={() => setLogPage((p) => p + 1)}
                        disabled={(logPage + 1) * LOGS_PER_PAGE >= logs.length}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 7,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.04)",
                          color: "white",
                          cursor: "pointer",
                          opacity:
                            (logPage + 1) * LOGS_PER_PAGE >= logs.length
                              ? 0.4
                              : 1,
                        }}
                      >
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* BAN MANAGER */}
          {tab === "bans" && (
            <motion.div
              key="bans"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ display: "grid", gap: 18, alignItems: "start" }}
              className="admin-grid"
            >
              {/* Ban form */}
              <div
                style={{
                  ...S.card,
                  padding: "26px 22px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={S.accent} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    marginBottom: 22,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "linear-gradient(135deg,#ef4444,#dc2626)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ban size={16} color="white" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: "0.2em",
                        color: "#ef4444",
                      }}
                    >
                      BAN SYSTEM
                    </div>
                    <div
                      style={{ fontSize: 14, fontWeight: 900, color: "white" }}
                    >
                      Issue Ban
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Type</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      ["ip", "IP Address"],
                      ["hwid", "HWID"],
                    ].map(([t, l]) => (
                      <button
                        key={t}
                        onClick={() => setBanType(t)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: 10,
                          fontWeight: 900,
                          fontSize: 12,
                          border: "1px solid",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          background:
                            banType === t
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(255,255,255,0.04)",
                          borderColor:
                            banType === t
                              ? "rgba(239,68,68,0.5)"
                              : "rgba(255,255,255,0.08)",
                          color:
                            banType === t ? "#ef4444" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>
                    {banType === "ip" ? "IP Address" : "HWID"}
                  </label>
                  <input
                    value={banVal}
                    onChange={(e) => setBanVal(e.target.value)}
                    placeholder={banType === "ip" ? "192.168.1.1" : "HWID-..."}
                    style={S.inp}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>Reason</label>
                  <input
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    placeholder="e.g. cheating, abuse..."
                    style={S.inp}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={S.label}>Expires (empty = permanent)</label>
                  <input
                    type="date"
                    value={banUntil}
                    onChange={(e) => setBanUntil(e.target.value)}
                    style={{ ...S.inp, colorScheme: "dark" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
                <motion.button
                  onClick={addBan}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    fontWeight: 900,
                    fontSize: 14,
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    background: "linear-gradient(135deg,#ef4444,#dc2626)",
                    boxShadow: "0 6px 22px rgba(239,68,68,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Ban size={14} /> ISSUE BAN
                </motion.button>
              </div>

              {/* Ban list */}
              <div
                style={{
                  ...S.card,
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 360,
                }}
              >
                <div style={S.accent} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: "0.2em",
                        color: "#ef4444",
                        marginBottom: 2,
                      }}
                    >
                      ACTIVE BANS
                    </div>
                    <div
                      style={{ fontSize: 15, fontWeight: 900, color: "white" }}
                    >
                      Bans{" "}
                      <span style={{ color: "#ef4444" }}>({bans.length})</span>
                    </div>
                  </div>
                  <button
                    onClick={fetchBans}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "7px 13px",
                      borderRadius: 9,
                      fontSize: 12,
                      fontWeight: 900,
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#ef4444",
                      cursor: "pointer",
                    }}
                  >
                    <RefreshCw size={12} /> Refresh
                  </button>
                </div>
                <div
                  style={{ padding: 14, maxHeight: 460, overflowY: "auto" }}
                  className="salt-scroll"
                >
                  {bansLoad ? (
                    <div
                      style={{
                        padding: 40,
                        textAlign: "center",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      Loading...
                    </div>
                  ) : bans.length === 0 ? (
                    <div
                      style={{
                        padding: 60,
                        textAlign: "center",
                        color: "rgba(255,255,255,0.2)",
                      }}
                    >
                      <Ban
                        size={28}
                        style={{
                          margin: "0 auto 10px",
                          display: "block",
                          opacity: 0.2,
                        }}
                      />
                      <p style={{ margin: 0, fontSize: 13 }}>No active bans.</p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      {bans.map((ban, i) => (
                        <motion.div
                          key={ban.id}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "12px 14px",
                            borderRadius: 11,
                            background: "rgba(239,68,68,0.05)",
                            border: "1px solid rgba(239,68,68,0.12)",
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 9,
                              background: "rgba(239,68,68,0.12)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {ban.type === "ip" ? (
                              <Globe size={13} style={{ color: "#ef4444" }} />
                            ) : (
                              <Hash size={13} style={{ color: "#ef4444" }} />
                            )}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <code
                              style={{
                                fontFamily: "monospace",
                                fontSize: 12,
                                fontWeight: 700,
                                color: "white",
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {ban.value}
                            </code>
                            <span
                              style={{
                                fontSize: 10,
                                color: "rgba(255,255,255,0.3)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {ban.type} · {ban.reason} ·{" "}
                              {ban.banned_until
                                ? `Until ${new Date(ban.banned_until).toLocaleDateString()}`
                                : "Permanent"}
                            </span>
                          </div>
                          <button
                            onClick={() => removeBan(ban.value)}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.2)",
                              cursor: "pointer",
                            }}
                          >
                            <Trash2 size={12} style={{ color: "#ef4444" }} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body{margin:0}*{box-sizing:border-box}
        .salt-scroll::-webkit-scrollbar{width:4px;height:4px}
        .salt-scroll::-webkit-scrollbar-thumb{background:rgba(239,68,68,0.3);border-radius:10px}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(min-width:860px){.admin-grid{grid-template-columns:340px 1fr!important}}
      `}</style>
    </div>
  );
}

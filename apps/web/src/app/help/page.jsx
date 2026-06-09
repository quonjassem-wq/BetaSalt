"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../components/Navbar";
import {
  MessageSquare,
  Send,
  ExternalLink,
  Bot,
  User,
  Zap,
} from "lucide-react";

const KB = [
  {
    keys: ["release", "when", "date", "out", "launch"],
    ans: "Salt is targeting a release around June 15, 2026! We're working hard to make sure everything is perfect. Join Discord for instant updates! 🚀",
  },
  {
    keys: ["key", "keysystem", "free", "get key", "obtain"],
    ans: "Salt is free to use with a key system! Get your daily key through Linkvertise or Lootlabs — it takes less than a minute and lasts 24 hours. Visit the Get Key page!",
  },
  {
    keys: [
      "price",
      "cost",
      "paid",
      "week",
      "month",
      "perm",
      "permanent",
      "buy",
    ],
    ans: "💰 Salt Pricing:\n• 1 Day — Free (Ads)\n• 1 Week — $2.99\n• 30 Days — $9.99\n• Permanent — $14.99\n\nPaid keys skip ads and get priority support!",
  },
  {
    keys: ["unc", "sunc", "support", "compatibility"],
    ans: "Salt has 100% UNC support and 98% sUNC support! We have near-perfect compatibility with all modern scripts. 💪",
  },
  {
    keys: ["hwid", "device", "lock", "change"],
    ans: "Keys are HWID-locked to 1 device by default. You can reset your HWID in the Dashboard — frequency depends on your key type (usually every 7 days).",
  },
  {
    keys: ["multi", "instance", "multiple"],
    ans: "Yes! Multi-instance works great in our last test. You can run multiple Roblox clients at the same time with Salt.",
  },
  {
    keys: ["ban", "banned", "undetected", "safe", "detect"],
    ans: "Our team constantly updates bypasses. Salt is working to stay undetected, but no executor is 100% safe during ban waves. Always use an alt account to be safe! 🛡️",
  },
  {
    keys: ["discord", "server", "community", "join"],
    ans: "Join our Discord for support, updates, and early access: discord.gg/yZyHEugsPF — we're always active! 💬",
  },
  {
    keys: ["download", "install", "use", "executor"],
    ans: "Salt hasn't released yet — but it's coming soon (targeting June 15, 2026)! Click the download button on the home page to get notified when we drop. 🔥",
  },
  {
    keys: ["owner", "sugar", "salt", "team", "dev", "developer"],
    ans: "Salt Executor is built by Salt (Owner) and Sugar (Co-Owner). A small but passionate team dedicated to making the best free executor!",
  },
  {
    keys: ["version", "v0", "0.0.1"],
    ans: "Current version is v0.0.1 (pre-release). We'll update this as we approach launch and add features!",
  },
];

const OFFHOOK = [
  "burger",
  "pizza",
  "food",
  "mcdonalds",
  "restaurant",
  "coffee",
  "drink",
  "cook",
  "recipe",
  "movie",
  "music",
  "game",
  "minecraft",
  "fortnite",
  "weather",
  "news",
  "stock",
];

function getBotResponse(msg) {
  const lower = msg.toLowerCase();
  if (OFFHOOK.some((w) => lower.includes(w))) {
    return "Nice one 😂 but this is an executor website, not McDonald's! Try asking me about Salt, keys, or the release date instead 🔥";
  }
  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.ans;
  }
  return "I'm not sure about that! For anything I can't answer, our Discord is the best place to get help: discord.gg/yZyHEugsPF 💬";
}

function useTypewriterStream(text, onDone) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    ref.current = setInterval(() => {
      if (i < text.length) {
        i++;
        setDisplayed(text.slice(0, i));
      } else {
        clearInterval(ref.current);
        if (onDone) onDone();
      }
    }, 10);
    return () => clearInterval(ref.current);
  }, [text]);
  return displayed;
}

function BotMessage({ text, isLast }) {
  const displayed = useTypewriterStream(text, null);
  const lines = (isLast ? displayed : text).split("\n");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        maxWidth: "80%",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: "var(--accent-glow,rgba(239,68,68,0.12))",
          border: "1px solid var(--accent-glow,rgba(239,68,68,0.22))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Bot size={16} style={{ color: "var(--accent,#ef4444)" }} />
      </div>
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "4px 16px 16px 16px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: 14,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.88)",
        }}
      >
        {lines.map((l, idx) => (
          <span key={idx}>
            {l}
            {idx < lines.length - 1 && <br />}
          </span>
        ))}
        {isLast && displayed.length < text.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            style={{ color: "var(--accent,#ef4444)", fontWeight: 900 }}
          >
            |
          </motion.span>
        )}
      </div>
    </div>
  );
}

export default function HelpPage() {
  const [msgs, setMsgs] = useState([
    {
      role: "bot",
      text: "Hey! 👋 I'm the Salt Assistant. Ask me anything about Salt Executor — keys, release dates, pricing, or features!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = () => {
    const q = input.trim();
    if (!q || typing) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: getBotResponse(q) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg,#050505)",
        color: "white",
        fontFamily: "'Space Grotesk', sans-serif",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
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
              "radial-gradient(circle,var(--orb1,rgba(239,68,68,0.06)) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <main
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: 760,
          width: "100%",
          margin: "0 auto",
          padding: "112px 20px 32px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 28 }}
        >
          {/* Logo */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 20,
              marginBottom: 16,
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
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
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "white",
                position: "relative",
                zIndex: 1,
              }}
            >
              S
            </span>
          </motion.div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.4em",
              color: "var(--accent,#ef4444)",
              marginBottom: 8,
            }}
          >
            HELP CENTER
          </div>
          <h1
            style={{
              fontSize: "clamp(28px,5vw,44px)",
              fontWeight: 900,
              color: "white",
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Salt Assistant
          </h1>
          <p style={{ fontSize: 14, color: "var(--muted,#6b7280)", margin: 0 }}>
            Ask anything about Salt Executor — I know it all!
          </p>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 22,
            overflow: "hidden",
            background: "var(--surface,rgba(14,14,14,0.9))",
            border: "1px solid var(--border,rgba(255,255,255,0.07))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            position: "relative",
            minHeight: 420,
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

          {/* Chat header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 22px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px #22c55e80",
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Salt Assistant
            </span>
            <div
              style={{
                marginLeft: "auto",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 900,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#22c55e",
              }}
            >
              ONLINE
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
            className="chat-scroll"
          >
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {m.role === "bot" ? (
                  <BotMessage text={m.text} isLast={i === msgs.length - 1} />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      maxWidth: "80%",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <User
                        size={16}
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      />
                    </div>
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "16px 4px 16px 16px",
                        background: "var(--accent-glow,rgba(239,68,68,0.12))",
                        border:
                          "1px solid var(--accent-glow,rgba(239,68,68,0.2))",
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "white",
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            {typing && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: "var(--accent-glow,rgba(239,68,68,0.12))",
                    border: "1px solid var(--accent-glow,rgba(239,68,68,0.22))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bot size={16} style={{ color: "var(--accent,#ef4444)" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, delay: d, repeat: Infinity }}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "var(--accent,#ef4444)",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div
            style={{
              padding: "10px 22px 0",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {[
              "When does Salt release?",
              "How do I get a key?",
              "Is Salt undetected?",
              "Pricing?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "var(--accent,#ef4444)";
                  e.target.style.color = "var(--accent,#ef4444)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.08)";
                  e.target.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "14px 22px 20px", display: "flex", gap: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything about Salt..."
              style={{
                flex: 1,
                padding: "13px 18px",
                borderRadius: 14,
                fontSize: 14,
                color: "white",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                outline: "none",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--accent,#ef4444)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
            <motion.button
              onClick={send}
              disabled={!input.trim() || typing}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                border: "none",
                cursor: !input.trim() || typing ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                opacity: !input.trim() || typing ? 0.5 : 1,
              }}
            >
              <Send size={18} color="white" />
            </motion.button>
          </div>
        </motion.div>

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: 16,
            padding: "20px 24px",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
            background: "var(--surface,rgba(14,14,14,0.9))",
            border: "1px solid var(--border,rgba(255,255,255,0.07))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "white",
                margin: "0 0 2px",
              }}
            >
              Need more help?
            </p>
            <p
              style={{ fontSize: 12, color: "var(--muted,#6b7280)", margin: 0 }}
            >
              Our team is always active in Discord.
            </p>
          </div>
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
              padding: "11px 22px",
              borderRadius: 12,
              fontWeight: 900,
              fontSize: 13,
              color: "white",
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              textDecoration: "none",
              boxShadow: "0 6px 20px var(--accent-glow,rgba(239,68,68,0.28))",
              whiteSpace: "nowrap",
            }}
          >
            <MessageSquare size={16} /> GET HELP IN DISCORD{" "}
            <ExternalLink size={13} />
          </motion.a>
        </motion.div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; } body { margin: 0; } * { box-sizing: border-box; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(239,68,68,0.25); border-radius: 10px; }
      `}</style>
    </div>
  );
}

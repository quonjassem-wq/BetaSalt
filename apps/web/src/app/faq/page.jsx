"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../components/Navbar";
import { ChevronDown, MessageSquare, Sparkles } from "lucide-react";

const faqs = [
  {
    q: "Is Salt Paid?",
    a: "Salt will always be free with ads. We believe powerful tools should be accessible to everyone — no paywall, no BS, no compromises.",
  },
  {
    q: "Is Salt Keyless?",
    a: "No, Salt uses a key system. Your free daily key is obtained through a quick ad (Linkvertise or Lootlabs) and lasts 24 hours.",
  },
  {
    q: "When will Salt Release?",
    a: "Salt hasn't released yet — we're targeting around June 15, 2026. Stay tuned in our Discord for early access info and announcements.",
  },
  {
    q: "What are the Paid Key Prices?",
    a: "1 Day — Free (Ads)\n1 Week — $2.99\n30 Days — $9.99\nPermanent — $14.99\n\nPaid keys skip ads entirely and come with priority support.",
  },
  {
    q: "Does Salt support Multi Instance?",
    a: "Yes — multi-instance is working well based on our last test. Run multiple Roblox clients at once with zero issues.",
  },
  {
    q: "Is Salt undetected?",
    a: "Our team works constantly on bypass updates. No executor is 100% safe during ban waves — we strongly recommend using an alt account just in case.",
  },
  {
    q: "More questions?",
    a: "Join our Discord for real-time answers from the Salt team and community. We're always active and happy to help!",
  },
];

function TypewriterAnswer({ text }) {
  const [displayed, setDisplayed] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    timerRef.current = setInterval(() => {
      if (i < text.length) {
        i++;
        setDisplayed(text.slice(0, i));
      } else {
        clearInterval(timerRef.current);
      }
    }, 13);
    return () => clearInterval(timerRef.current);
  }, [text]);

  const lines = displayed.split("\n");
  return (
    <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {lines.map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < lines.length - 1 && <br />}
        </span>
      ))}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.45, repeat: Infinity }}
          style={{ color: "var(--accent,#ef4444)", fontWeight: 900 }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "var(--surface,rgba(14,14,14,0.9))",
        border: isOpen
          ? "1px solid var(--accent,#ef4444)"
          : "1px solid var(--border,rgba(255,255,255,0.08))",
        boxShadow: isOpen
          ? "0 4px 32px var(--accent-glow,rgba(239,68,68,0.12))"
          : "none",
        transition: "border-color 0.28s, box-shadow 0.28s",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Question button */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 26px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 11,
              fontWeight: 900,
              color: "var(--accent,#ef4444)",
              minWidth: 26,
              flexShrink: 0,
              letterSpacing: "0.1em",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: isOpen ? "white" : "rgba(255,255,255,0.82)",
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "color 0.2s",
            }}
          >
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            duration: 0.28,
            type: "spring",
            stiffness: 240,
            damping: 22,
          }}
          style={{
            flexShrink: 0,
            width: 34,
            height: 34,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isOpen
              ? "var(--accent-glow,rgba(239,68,68,0.15))"
              : "rgba(255,255,255,0.04)",
            color: isOpen ? "var(--accent,#ef4444)" : "rgba(255,255,255,0.35)",
            transition: "background 0.28s, color 0.28s",
          }}
        >
          <ChevronDown size={16} strokeWidth={2.5} />
        </motion.div>
      </button>

      {/* Answer — AnimatePresence needs a key */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "20px 26px 28px 68px",
                borderTop: "1px solid var(--border,rgba(255,255,255,0.06))",
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--muted,#6b7280)",
                  margin: 0,
                }}
              >
                <TypewriterAnswer text={faq.a} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

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

      {/* Fixed bg */}
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
            width: 500,
            height: 500,
            top: -80,
            right: -80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb1,rgba(239,68,68,0.09)) 0%,transparent 70%)",
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
            bottom: 100,
            left: -80,
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
          maxWidth: 720,
          margin: "0 auto",
          padding: "140px 20px 100px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.div
            animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              marginBottom: 20,
              background: "var(--accent-glow,rgba(239,68,68,0.1))",
              border: "1px solid var(--accent-glow,rgba(239,68,68,0.22))",
              boxShadow: "0 0 30px var(--accent-glow,rgba(239,68,68,0.1))",
            }}
          >
            <Sparkles size={28} style={{ color: "var(--accent,#ef4444)" }} />
          </motion.div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.45em",
              color: "var(--accent,#ef4444)",
              marginBottom: 12,
            }}
          >
            KNOWLEDGE BASE
          </div>
          <h1
            style={{
              fontSize: "clamp(38px,7vw,62px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              margin: "0 0 14px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            FAQ
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            style={{
              height: 1,
              width: 160,
              margin: "0 auto 18px",
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p style={{ fontSize: 15, color: "var(--muted,#6b7280)", margin: 0 }}>
            Click any question to reveal the answer.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 48,
          }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            padding: "40px 36px",
            borderRadius: 22,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: "var(--surface,rgba(14,14,14,0.9))",
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
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.4em",
              color: "var(--accent,#ef4444)",
              marginBottom: 10,
            }}
          >
            STILL NEED HELP?
          </div>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "white",
              margin: "0 0 8px",
            }}
          >
            More in Discord
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted,#6b7280)",
              margin: "0 0 24px",
            }}
          >
            Our team & community are always ready to help.
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
              gap: 10,
              padding: "14px 32px",
              borderRadius: 14,
              fontWeight: 900,
              fontSize: 14,
              color: "white",
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              textDecoration: "none",
              boxShadow: "0 8px 28px var(--accent-glow,rgba(239,68,68,0.3))",
            }}
          >
            <MessageSquare size={18} /> JOIN DISCORD
          </motion.a>
        </motion.div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; } body { margin: 0; } * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

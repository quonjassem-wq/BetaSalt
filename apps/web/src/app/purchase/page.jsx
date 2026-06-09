"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../components/Navbar";
import {
  ShoppingCart,
  Check,
  X,
  Bitcoin,
  Zap,
  DollarSign,
  Star,
  MessageSquare,
  Plus,
  Minus,
  Trash2,
  Clock,
} from "lucide-react";

const PLANS = [
  {
    id: "week",
    label: "1 Week",
    duration: "7 days",
    price: 2.99,
    badge: null,
    color: "#3b82f6",
  },
  {
    id: "month",
    label: "30 Days",
    duration: "30 days",
    price: 9.99,
    badge: "POPULAR",
    color: "#a855f7",
  },
  {
    id: "perm",
    label: "Permanent",
    duration: "Lifetime",
    price: 14.99,
    badge: "BEST VALUE",
    color: "#ef4444",
  },
];

const PAYMENT_METHODS = [
  { id: "ltc", label: "Litecoin", icon: "Ł", color: "#c2a633", sub: "Crypto" },
  { id: "btc", label: "Bitcoin", icon: "₿", color: "#f7931a", sub: "Crypto" },
  { id: "robux", label: "Robux", icon: "R$", color: "#00b06f", sub: "Roblox" },
  {
    id: "paypal",
    label: "PayPal",
    icon: "PP",
    color: "#0070ba",
    sub: "PayPal",
  },
];

const COMING_SOON_METHODS = [
  { id: "applepay", label: "Apple Pay", icon: "🍎", sub: "Coming Soon" },
  { id: "cashapp", label: "Cash App", icon: "$", sub: "Coming Soon" },
  { id: "venmo", label: "Venmo", icon: "V", sub: "Coming Soon" },
];

const S = {
  card: {
    background: "var(--surface,rgba(14,14,14,0.9))",
    border: "1px solid var(--border,rgba(255,255,255,0.07))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
  },
};

export default function PurchasePage() {
  const [cart, setCart] = useState({});
  const [payMethod, setPayMethod] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (plan) =>
    setCart((prev) => ({ ...prev, [plan.id]: (prev[plan.id] || 0) + 1 }));
  const removeFromCart = (id) =>
    setCart((prev) => {
      const n = { ...prev };
      if (n[id] > 1) n[id]--;
      else delete n[id];
      return n;
    });
  const removeAll = (id) =>
    setCart((prev) => {
      const n = { ...prev };
      delete n[id];
      return n;
    });

  const cartItems = PLANS.filter((p) => cart[p.id]);
  const total = cartItems.reduce((s, p) => s + p.price * (cart[p.id] || 0), 0);
  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  const handlePurchase = () => {
    if (!payMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (cartCount === 0) {
      alert("Your cart is empty.");
      return;
    }
    setShowPopup(true);
  };

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
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
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
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            bottom: -80,
            right: -80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb2,rgba(127,29,29,0.09)) 0%,transparent 70%)",
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
          maxWidth: 1100,
          margin: "0 auto",
          padding: "130px 20px 80px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.4em",
              color: "var(--accent,#ef4444)",
              marginBottom: 10,
            }}
          >
            SALT STORE
          </div>
          <h1
            style={{
              fontSize: "clamp(36px,6vw,60px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
            }}
          >
            Purchase Salt
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              height: 1,
              width: 160,
              margin: "0 auto 16px",
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p style={{ fontSize: 15, color: "var(--muted,#6b7280)", margin: 0 }}>
            Choose your plan, add to cart, and check out below.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              padding: "7px 16px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.2)",
              color: "#eab308",
            }}
          >
            <Clock size={13} /> Store opens on Salt's release date
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          {/* Plans */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.3em",
                color: "var(--accent,#ef4444)",
                marginBottom: 16,
              }}
            >
              SELECT PLAN
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                gap: 14,
              }}
            >
              {PLANS.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 20px 50px ${plan.color}18`,
                  }}
                  style={{
                    ...S.card,
                    padding: "28px 24px",
                    position: "relative",
                    overflow: "hidden",
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
                      background: `linear-gradient(90deg,transparent,${plan.color},transparent)`,
                    }}
                  />
                  {plan.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: "0.1em",
                        background: `${plan.color}20`,
                        border: `1px solid ${plan.color}50`,
                        color: plan.color,
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: plan.color,
                      marginBottom: 4,
                    }}
                  >
                    {plan.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--muted,#6b7280)",
                      marginBottom: 16,
                    }}
                  >
                    {plan.duration}
                  </div>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: "white",
                      marginBottom: 20,
                    }}
                  >
                    ${plan.price.toFixed(2)}
                  </div>
                  <motion.button
                    onClick={() => addToCart(plan)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 12,
                      fontWeight: 900,
                      fontSize: 13,
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      background: `linear-gradient(135deg,${plan.color},${plan.color}cc)`,
                      boxShadow: `0 4px 16px ${plan.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <ShoppingCart size={15} /> Add to Cart{" "}
                    {cart[plan.id] > 0 && (
                      <span
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          padding: "2px 8px",
                          borderRadius: 999,
                        }}
                      >
                        {cart[plan.id]}
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart + Payment + Checkout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 20,
            }}
          >
            {/* Cart */}
            <div
              style={{
                ...S.card,
                padding: "24px",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <ShoppingCart
                  size={18}
                  style={{ color: "var(--accent,#ef4444)" }}
                />
                <span style={{ fontSize: 15, fontWeight: 900, color: "white" }}>
                  Cart
                </span>
                {cartCount > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      padding: "3px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 900,
                      background: "var(--accent-glow,rgba(239,68,68,0.15))",
                      color: "var(--accent,#ef4444)",
                    }}
                  >
                    {cartCount} items
                  </span>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div
                  style={{
                    padding: "32px 0",
                    textAlign: "center",
                    color: "var(--muted,#6b7280)",
                    fontSize: 14,
                  }}
                >
                  <ShoppingCart
                    size={32}
                    style={{
                      opacity: 0.2,
                      margin: "0 auto 10px",
                      display: "block",
                    }}
                  />
                  Your cart is empty
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {cartItems.map((plan) => (
                    <div
                      key={plan.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "white",
                          }}
                        >
                          {plan.label}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--muted,#6b7280)",
                          }}
                        >
                          ${plan.price.toFixed(2)} each
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <button
                          onClick={() => removeFromCart(plan.id)}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 900,
                            color: "white",
                            minWidth: 20,
                            textAlign: "center",
                          }}
                        >
                          {cart[plan.id]}
                        </span>
                        <button
                          onClick={() => addToCart(plan)}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeAll(plan.id)}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            border: "1px solid rgba(239,68,68,0.2)",
                            background: "rgba(239,68,68,0.08)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ef4444",
                            marginLeft: 4,
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0 0",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      fontSize: 16,
                      fontWeight: 900,
                      color: "white",
                    }}
                  >
                    <span>Total</span>
                    <span style={{ color: "var(--accent,#ef4444)" }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Payment + Checkout */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  ...S.card,
                  padding: "24px",
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
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: "white",
                    marginBottom: 14,
                  }}
                >
                  Payment Method
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      style={{
                        padding: "12px 10px",
                        borderRadius: 12,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        cursor: "pointer",
                        border:
                          payMethod === m.id
                            ? `1px solid ${m.color}`
                            : "1px solid rgba(255,255,255,0.07)",
                        background:
                          payMethod === m.id
                            ? `${m.color}15`
                            : "rgba(255,255,255,0.03)",
                        transition: "all 0.2s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 900,
                          color: m.color,
                        }}
                      >
                        {m.icon}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color:
                            payMethod === m.id
                              ? "white"
                              : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {m.label}
                      </span>
                      <span
                        style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}
                      >
                        {m.sub}
                      </span>
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.25)",
                    marginBottom: 8,
                  }}
                >
                  COMING SOON
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 6,
                  }}
                >
                  {COMING_SOON_METHODS.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: "10px 6px",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        opacity: 0.5,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{m.icon}</span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handlePurchase}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: 16,
                  fontWeight: 900,
                  fontSize: 15,
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  background:
                    "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                  boxShadow:
                    "0 8px 32px var(--accent-glow,rgba(239,68,68,0.35))",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Zap size={18} strokeWidth={2.5} /> PURCHASE NOW
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* Purchase popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(20px)",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 16 }}
              style={{
                maxWidth: 440,
                width: "100%",
                borderRadius: 26,
                overflow: "hidden",
                background: "rgba(10,2,2,0.99)",
                border: "1px solid rgba(239,68,68,0.35)",
                boxShadow:
                  "0 0 80px rgba(239,68,68,0.2),0 24px 60px rgba(0,0,0,0.8)",
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
                  padding: "48px 40px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <span style={{ fontSize: 60 }}>⏳</span>
                </motion.div>
                <div>
                  <h2
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      color: "white",
                      margin: "0 0 10px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Not Yet Open!
                  </h2>
                  <p
                    style={{
                      fontSize: 15,
                      color: "rgba(255,255,255,0.6)",
                      margin: 0,
                      lineHeight: 1.65,
                    }}
                  >
                    You can purchase when Salt releases.
                    <br />
                    Join our Discord to get notified the moment we go live!
                  </p>
                </div>
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
                    boxShadow: "0 6px 20px rgba(239,68,68,0.3)",
                  }}
                >
                  <MessageSquare size={18} /> Join Discord
                </motion.a>
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.3)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 12px",
                    borderRadius: 8,
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; } body { margin: 0; } * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

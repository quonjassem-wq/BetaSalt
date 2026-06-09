import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Help", path: "/help" },
  { label: "Credits", path: "/credits" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Purchase", path: "/purchase" },
];

const Navbar = () => {
  const [path, setPath] = useState("/");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
      const onScroll = () => setScrolled(window.scrollY > 30);
      const onResize = () => setIsMobile(window.innerWidth < 768);
      onResize();
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          background: scrolled ? "rgba(5,5,5,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition: "background 0.4s, backdrop-filter 0.4s",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background:
                "var(--gradient, linear-gradient(135deg,#ef4444,#dc2626))",
              boxShadow: "0 0 24px var(--accent-glow, rgba(239,68,68,0.4))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <img
              src="/image.png"
              alt="Salt Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: 18,
                position: "relative",
                zIndex: 1,
              }}
            >
              S
            </span>
          </motion.div>
          <span
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "0.22em",
              textShadow: "0 0 24px var(--accent-glow, rgba(239,68,68,0.5))",
            }}
          >
            SALT
          </span>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navItems.map((item) => {
              const active = path === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  style={{
                    position: "relative",
                    padding: "8px 16px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 600,
                    color: active
                      ? "var(--accent,#ef4444)"
                      : "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    background: active
                      ? "var(--accent-glow,rgba(239,68,68,0.1))"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid transparent",
                    transition: "color 0.2s, background 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </a>
              );
            })}
            <motion.a
              href="/get-key"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{
                marginLeft: 12,
                padding: "9px 20px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 900,
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 6,
                background:
                  "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                boxShadow: "0 4px 18px var(--accent-glow,rgba(239,68,68,0.35))",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <Zap size={13} strokeWidth={3} /> GET KEY
            </motion.a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              color: "white",
              background: "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: 10,
              padding: "8px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 70,
              left: 0,
              right: 0,
              zIndex: 40,
              background: "rgba(5,5,5,0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.path}
                href={item.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  padding: "12px 20px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color:
                    path === item.path
                      ? "var(--accent,#ef4444)"
                      : "rgba(255,255,255,0.7)",
                  background:
                    path === item.path
                      ? "var(--accent-glow,rgba(239,68,68,0.1))"
                      : "transparent",
                  textDecoration: "none",
                  display: "block",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
            <a
              href="/get-key"
              style={{
                margin: "6px 0 4px",
                padding: "14px 20px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 900,
                color: "white",
                textAlign: "center",
                background:
                  "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                textDecoration: "none",
                display: "block",
              }}
            >
              GET KEY
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

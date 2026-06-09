"use client";
import { useEffect } from "react";

export default function InspectGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already caught — redirect immediately unless we're on /warn
    if (
      localStorage.getItem("salt_inspect_caught") === "true" &&
      !window.location.pathname.startsWith("/warn")
    ) {
      window.location.replace("/warn");
      return;
    }

    const trigger = () => {
      if (window.location.pathname.startsWith("/warn")) return;
      localStorage.setItem("salt_inspect_caught", "true");
      window.location.replace("/warn");
    };

    const handleKeyDown = (e) => {
      const blocked =
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && [73, 74, 67, 75, 85].includes(e.keyCode)) || // Ctrl+Shift+I/J/C/K/U
        (e.ctrlKey && e.keyCode === 85); // Ctrl+U
      if (blocked) {
        e.preventDefault();
        e.stopImmediatePropagation();
        trigger();
        return false;
      }
    };

    const handleContext = (e) => {
      e.preventDefault();
      return false;
    };

    // DevTools open detection via window size diff
    let devtools = false;
    const devtoolsCheck = setInterval(() => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if ((widthDiff || heightDiff) && !devtools) {
        devtools = true;
        trigger();
      }
    }, 1000);

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContext, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("contextmenu", handleContext, true);
      clearInterval(devtoolsCheck);
    };
  }, []);

  return null;
}

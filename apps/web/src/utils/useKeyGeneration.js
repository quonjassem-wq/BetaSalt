import { useState } from "react";
import { toast } from "sonner";

export function useKeyGeneration(password) {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(1);
  const [amount, setAmount] = useState(1);
  const [generatedKeys, setGeneratedKeys] = useState([]);
  const [copiedKey, setCopiedKey] = useState(null);

  const generateKeys = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, duration, amount }),
      });
      const data = await res.json();
      if (data.keys) {
        setGeneratedKeys(data.keys);
        toast.success(
          `Generated ${amount} key${amount > 1 ? "s" : ""} successfully.`,
          {
            style: {
              background: "#0a0a0a",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "white",
            },
          },
        );
      } else {
        toast.error(data.error || "Generation failed.", {
          style: {
            background: "#0a0a0a",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "white",
          },
        });
      }
    } catch {
      toast.error("Server connection error.", {
        style: {
          background: "#0a0a0a",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const copyKey = (key) => {
    if (typeof navigator !== "undefined") navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
    toast.success("Copied to clipboard!", {
      style: {
        background: "#0a0a0a",
        border: "1px solid rgba(34,197,94,0.3)",
        color: "white",
      },
    });
  };

  const copyAll = () => {
    if (typeof navigator !== "undefined")
      navigator.clipboard.writeText(
        generatedKeys.map((k) => k.key_value).join("\n"),
      );
    toast.success("All keys copied!", {
      style: {
        background: "#0a0a0a",
        border: "1px solid rgba(34,197,94,0.3)",
        color: "white",
      },
    });
  };

  const resetKeys = () => {
    setGeneratedKeys([]);
  };

  return {
    loading,
    duration,
    setDuration,
    amount,
    setAmount,
    generatedKeys,
    copiedKey,
    generateKeys,
    copyKey,
    copyAll,
    resetKeys,
  };
}

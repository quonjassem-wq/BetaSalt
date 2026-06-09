import { useState } from "react";
import { toast } from "sonner";
import { ADMIN_PASS } from "@/components/AdminPage/constants";

export function useAdminAuth() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthorized(true);
      toast.success("Welcome back, Salt.", {
        style: {
          background: "#0a0a0a",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "white",
        },
      });
    } else {
      toast.error("Invalid admin key.", {
        style: {
          background: "#0a0a0a",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "white",
        },
      });
    }
  };

  const handleSignOut = () => {
    setIsAuthorized(false);
    setPassword("");
  };

  return {
    password,
    setPassword,
    isAuthorized,
    handleLogin,
    handleSignOut,
  };
}

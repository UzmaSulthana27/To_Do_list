// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { me, authStorage } from "../api/api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const u = await me();
      setUser(u);
    } catch (e) {
      authStorage.clear();
      setUser(null);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function logout() {
    authStorage.clear();
    setUser(null);
  }

  return { user, setUser, loading, reload: load, logout };
}

// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { user, setUser, loading, reload, logout } = useAuth();
  const [view, setView] = useState("dashboard"); // 'login' | 'register' | 'dashboard'

  // If auth hook still loading, show simple loader.
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={logout} setView={setView} />
      <main className="max-w-4xl mx-auto p-4">
        {view === "login" && <Login onSuccess={(u, token)=>{ setUser(u); reload(); setView("dashboard"); }} switchToRegister={()=>setView("register")} />}
        {view === "register" && <Register onSuccess={(u, token)=>{ setUser(u); reload(); setView("dashboard"); }} switchToLogin={()=>setView("login")} />}
        {view === "dashboard" && user && <Dashboard user={user} />}
        {view === "dashboard" && !user && <div className="text-center mt-10">Please login to continue.</div>}
      </main>
    </div>
  );
}

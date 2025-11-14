// src/components/layout/Navbar.jsx
import React from "react";

export default function Navbar({ user, onLogout, setView }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Task Manager</h1>
          <span className="text-sm text-gray-500">(frontend demo)</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setView("dashboard")} className="text-sm">Dashboard</button>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-700">{user.name}</div>
              <button onClick={onLogout} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setView("login")} className="text-sm">Login</button>
              <button onClick={() => setView("register")} className="text-sm">Register</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

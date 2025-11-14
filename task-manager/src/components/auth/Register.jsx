// src/components/auth/Register.jsx
import React, { useState } from "react";
import { register, authStorage } from "../../api/api";

export default function Register({ onSuccess, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await register({ name, email, password });
      authStorage.saveToken(res.token);
      onSuccess(res.user, res.token);
    } catch (err) {
      setError(err.data?.message || "Registration failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded" required />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 border rounded" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" required />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex items-center gap-2">
          <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? "Please wait..." : "Create Account"}</button>
          <button type="button" onClick={switchToLogin} className="text-sm text-gray-600">Already have account?</button>
        </div>
      </form>
    </div>
  );
}

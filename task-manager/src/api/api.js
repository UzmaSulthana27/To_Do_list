// src/api/api.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const tokenKey = "tm_token";

export const authStorage = {
  getToken() { return localStorage.getItem(tokenKey); },
  saveToken(t) { localStorage.setItem(tokenKey, t); },
  clear() { localStorage.removeItem(tokenKey); }
};

async function handleResponse(res) {
  const text = await res.text();
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch (e) { payload = text; }
  if (!res.ok) throw { status: res.status, data: payload };
  return payload;
}

export async function apiFetch(path, opts = {}) {
  const headers = { ...(opts.headers || {}) };
  const token = authStorage.getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(API_BASE + path, { ...opts, headers });
  return handleResponse(res);
}

// Auth helpers
export async function register({ name, email, password }) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
}

export async function login({ email, password }) {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
}

export async function me() {
  return apiFetch("/auth/me");
}

// Tasks
export async function getTasks(query = "") {
  return apiFetch("/tasks" + (query ? ("?" + query) : ""));
}
export async function getTask(id) { return apiFetch(`/tasks/${id}`); }
export async function createTask(payload) {
  return apiFetch("/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
}
export async function updateTask(id, payload) {
  return apiFetch(`/tasks/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
}
export async function deleteTask(id) {
  return apiFetch(`/tasks/${id}`, { method: "DELETE" });
}

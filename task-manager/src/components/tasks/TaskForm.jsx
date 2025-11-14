// src/components/tasks/TaskForm.jsx
import React, { useEffect, useState } from "react";

export default function TaskForm({ onCreate, editing, onUpdate, onCancel }) {
  const initial = editing ? editing : { title: "", description: "", category: "Work", priority: "Medium", due_date: "", completed: false };
  const [form, setForm] = useState(initial);

  useEffect(()=>{ setForm(initial); }, [editing]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.title) { alert("Title required"); return; }
    if (editing) { onUpdate(editing.id, form); }
    else { await onCreate(form); setForm({ title: "", description: "", category: "Work", priority: "Medium", due_date: "", completed: false }); }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
      <div className="md:col-span-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" className="w-full p-2 border rounded mt-2" />
      </div>
      <div className="space-y-2">
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Work</option><option>Personal</option><option>Study</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange} className="w-full p-2 border rounded">
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <input name="due_date" value={form.due_date} onChange={handleChange} type="date" className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm">{editing ? "Update" : "Add"}</button>
          {editing && <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded text-sm">Cancel</button>}
        </div>
      </div>
    </form>
  );
}

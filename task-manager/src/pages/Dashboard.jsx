// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api";

export default function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ category: "all", completed: "all", sort: "due_date", order: "asc" });
  const [editing, setEditing] = useState(null);

  useEffect(()=>{ fetchTasks(); }, [filter]);

  async function fetchTasks() {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (filter.category !== "all") q.set("category", filter.category);
      if (filter.completed !== "all") q.set("completed", filter.completed);
      q.set("sort", filter.sort); q.set("order", filter.order);
      const res = await getTasks(q.toString());
      setTasks(res || []);
    } catch (e) { console.error(e); setTasks([]); } finally { setLoading(false); }
  }

  async function handleCreate(payload) {
    await createTask(payload); fetchTasks();
  }
  async function handleUpdate(id, payload) {
    await updateTask(id, payload); fetchTasks();
  }
  async function handleDelete(task) {
    if (!confirm("Delete this task?")) return;
    await deleteTask(task.id); fetchTasks();
  }
  async function toggleComplete(task) {
    await updateTask(task.id, { completed: !task.completed }); fetchTasks();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Hello, {user.name}</h2>
        <div className="flex items-center gap-2">
          <select value={filter.category} onChange={e => setFilter({...filter, category: e.target.value})} className="p-2 border rounded">
            <option value="all">All Categories</option><option value="Work">Work</option><option value="Personal">Personal</option><option value="Study">Study</option>
          </select>
          <select value={filter.completed} onChange={e => setFilter({...filter, completed: e.target.value})} className="p-2 border rounded">
            <option value="all">All</option><option value="true">Completed</option><option value="false">Pending</option>
          </select>
          <select value={filter.sort} onChange={e => setFilter({...filter, sort: e.target.value})} className="p-2 border rounded">
            <option value="due_date">Due date</option><option value="priority">Priority</option>
          </select>
          <select value={filter.order} onChange={e => setFilter({...filter, order: e.target.value})} className="p-2 border rounded">
            <option value="asc">Asc</option><option value="desc">Desc</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <TaskForm onCreate={handleCreate} editing={editing} onUpdate={(id,p)=>{ handleUpdate(id,p); setEditing(null); }} onCancel={()=>setEditing(null)} />
      </div>

      <div className="bg-white rounded shadow p-4">
        {loading ? <div>Loading...</div> : <TaskList tasks={tasks} onEdit={(t)=>setEditing(t)} onToggleComplete={(t)=>toggleComplete(t)} onDelete={(t)=>handleDelete(t)} />}
      </div>
    </div>
  );
}

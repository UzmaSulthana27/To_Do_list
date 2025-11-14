// src/components/tasks/TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onEdit, onToggleComplete, onDelete }) {
  if (!tasks || tasks.length === 0) return <div className="text-gray-500">No tasks found.</div>;
  return (
    <div className="space-y-3">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onEdit={() => onEdit(t)} onToggleComplete={() => onToggleComplete(t)} onDelete={() => onDelete(t)} />
      ))}
    </div>
  );
}

// src/components/tasks/TaskItem.jsx
import React from "react";

export default function TaskItem({ task, onEdit, onToggleComplete, onDelete }) {
  const due = task.due_date ? new Date(task.due_date) : null;
  const overdue = due && !task.completed && (new Date().toDateString() > due.toDateString());

  return (
    <div className="border p-3 rounded flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={task.completed} onChange={onToggleComplete} />
          <div>
            <div className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</div>
            <div className="text-sm text-gray-600">{task.category} • {task.priority} {due && <span>• due {due.toLocaleDateString()}</span>}</div>
            {overdue && <div className="text-xs text-red-600">Overdue</div>}
          </div>
        </div>
        {task.description && <div className="mt-2 text-sm text-gray-700">{task.description}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={onEdit} className="text-sm px-2 py-1 border rounded">Edit</button>
        <button onClick={onDelete} className="text-sm px-2 py-1 border rounded text-red-600">Delete</button>
      </div>
    </div>
  );
}

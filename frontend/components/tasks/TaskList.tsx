'use client';

import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  onStatusChange: (task: Task, newStatus: Task['status']) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
}

export default function TaskList({ 
  tasks, 
  isLoading, 
  error, 
  onStatusChange, 
  onDelete,
  isUpdating 
}: TaskListProps) {
  if (isLoading) return <div className="bg-white p-6 rounded-lg shadow-md">Loading tasks...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-md">Error loading tasks</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Your Tasks</h2>
        {isUpdating && (
          <span className="text-sm text-gray-500 animate-pulse">Updating...</span>
        )}
      </div>
      
      {tasks.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task._id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {task.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task, e.target.value as Task['status'])}
                    disabled={isUpdating}
                    className="text-sm border-gray-300 rounded-md shadow-sm text-blue-700 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button
                    onClick={() => onDelete(task._id)}
                    disabled={isUpdating}
                    className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks to show</p>
      )}
    </div>
  );
}

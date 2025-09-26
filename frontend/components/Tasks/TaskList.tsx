'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, deleteTask, updateTask } from '../../services/taskService';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
}

export default function TaskList() {
  const queryClient = useQueryClient();
  
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (task: Task, newStatus: Task['status']) => {
    updateMutation.mutate({
      id: task._id,
      data: {
        title: task.title,
        description: task.description,
        status: newStatus
      }
    });
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your Tasks</h2>
      
      {tasks && tasks.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task: Task) => (
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
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value as Task['status'])}
                    className="text-sm border-gray-300 rounded-md shadow-sm text-blue-700 focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      )}
    </div>
  );
}
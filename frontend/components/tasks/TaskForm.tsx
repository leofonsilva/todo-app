'use client';

import { useForm } from 'react-hook-form';

interface TaskFormData {
  title: string;
  description: string;
}

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  isPending: boolean;
  error: Error | null;
}

export default function TaskForm({ onSubmit, isPending, error }: TaskFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            disabled={isPending}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            disabled={isPending}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">
            Failed to create task: {error.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isPending ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}

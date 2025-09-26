'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createTask } from '../../services/taskService';

interface TaskFormData {
  title: string;
  description: string;
}

export default function TaskForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();
  
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const onSubmit = (data: TaskFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-1 py-1 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-1 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {mutation.isError && (
          <div className="text-red-600 text-sm">
            Failed to create task
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
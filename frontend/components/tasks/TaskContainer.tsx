'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getTasks, deleteTask, updateTask, createTask } from '@/services/taskService';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskPagination from './TaskPagination';
import type { TaskFiltersRequest, Task, GetAllTasksResponse } from '@/types/task';

type TaskStatus = 'pending' | 'in-progress' | 'done';
type SortBy = 'title' | 'status' | 'createdAt' | 'updatedAt';
type SortOrder = 'asc' | 'desc';
type CompletedFilter = 'all' | 'completed' | 'not-completed';

export default function TaskContainer() {
  const queryClient = useQueryClient();

  // Estados dos filtros
  const [filters, setFilters] = useState({
    search: '',
    status: 'all' as TaskStatus | 'all',
    isCompleted: 'all' as CompletedFilter,
    page: 1,
    limit: 10,
    sortBy: 'createdAt' as SortBy,
    sortOrder: 'desc' as SortOrder,
  });

  const [isTyping, setIsTyping] = useState(false);
  const [debouncedFilters] = useDebounce(filters, 500);

  const { data, isLoading, error, isFetching, isPlaceholderData } = useQuery<GetAllTasksResponse>({
    queryKey: ['tasks', debouncedFilters],
    queryFn: () => {
      const apiFilters: TaskFiltersRequest = {
        search: debouncedFilters.search || undefined,
        status: debouncedFilters.status === 'all' ? undefined : debouncedFilters.status,
        isCompleted: debouncedFilters.isCompleted === 'all' ? undefined : debouncedFilters.isCompleted === 'completed',
        page: debouncedFilters.page,
        limit: debouncedFilters.limit,
        sortBy: debouncedFilters.sortBy,
        sortOrder: debouncedFilters.sortOrder,
      };
      console.log('Buscando com filtros:', apiFilters);
      return getTasks(apiFilters);
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });

  // Mutations
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

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Handlers
  const handleFilterChange = (key: string, value: any) => {
    // Atualiza UI instantaneamente
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Qualquer mudança de filtro volta pra página 1
    }));

    if (key === 'search') {
      setIsTyping(true);
      // Depois de 500ms, remove o indicador de digitação
      setTimeout(() => setIsTyping(false), 500);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      isCompleted: 'all',
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

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

  const handleCreateTask = (data: { title: string; description: string }) => {
    createMutation.mutate(data);
  };

  const isAnyMutationPending =
    deleteMutation.isPending ||
    updateMutation.isPending ||
    createMutation.isPending;

  return (
    <div className="space-y-6">
      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalTasks={data?.pagination?.total}
        isTyping={isTyping}
        isFetching={isFetching}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TaskForm
            onSubmit={handleCreateTask}
            isPending={createMutation.isPending}
            error={createMutation.error}
          />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <TaskList
            tasks={data?.tasks || []}
            isLoading={isLoading}
            error={error as Error | null}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            isUpdating={isAnyMutationPending}
          />

          {data?.pagination && data.pagination.totalPages > 1 && (
            <TaskPagination
              page={filters.page}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
              isFetching={isFetching}
            />
          )}
        </div>
      </div>
    </div>
  );
}

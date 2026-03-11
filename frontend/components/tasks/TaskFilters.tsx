'use client';

interface TaskFiltersProps {
  filters: {
    search: string;
    status: string;
    isCompleted: string;
    limit: number;
    sortBy: string;
    sortOrder: string;
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  totalTasks?: number;
  isTyping?: boolean;
  isFetching?: boolean;
}

export default function TaskFilters({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  totalTasks,
  isTyping,
  isFetching
}: TaskFiltersProps) {
  const hasActiveFilters = filters.search || 
    filters.status !== 'all' || 
    filters.isCompleted !== 'all' || 
    filters.limit !== 10 || 
    filters.sortBy !== 'createdAt' || 
    filters.sortOrder !== 'desc';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Primeira linha: Search e Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search - com indicadores visuais */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search tasks..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            
            <div className="absolute right-2 top-8">
              {isTyping && (
                <span className="text-xs text-gray-400 animate-pulse">
                  digitando...
                </span>
              )}
              {isFetching && !isTyping && (
                <span className="text-xs text-indigo-400 animate-pulse">
                  buscando...
                </span>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Completion
            </label>
            <select
              value={filters.isCompleted}
              onChange={(e) => onFilterChange('isCompleted', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="not-completed">Not Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange('sortBy', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="createdAt">Created Date</option>
                <option value="title">Title</option>
                <option value="status">Status</option>
                <option value="updatedAt">Updated Date</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => onFilterChange('sortOrder', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          </div>
        </div>

        {/* Linha de informação */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                Show:
              </label>
              <select
                value={filters.limit}
                onChange={(e) => onFilterChange('limit', Number(e.target.value))}
                className="rounded-md border-gray-300 shadow-sm px-2 py-1 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {totalTasks !== undefined && (
              <span className="text-sm text-gray-600">
                {totalTasks} tasks found
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

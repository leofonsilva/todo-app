'use client';

import TaskForm from '../../components/Tasks/TaskForm';
import TaskList from '../../components/Tasks/TaskList';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm />
          </div>
          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
}
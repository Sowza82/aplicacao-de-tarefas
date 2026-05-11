import React, { createContext, useState, useEffect, useContext } from 'react';

export const TaskContext = createContext();

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext deve ser usado dentro de TaskProvider');
  return ctx;
};

const PRIORITY_ORDER = { alta: 0, média: 1, baixa: 2 };

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('todas'); // todas | pendente | concluída
  const [sortBy, setSortBy] = useState('data'); // data | prioridade | titulo

  // Carrega do localStorage na montagem
  useEffect(() => {
    const stored = localStorage.getItem('taskflow_tasks');
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        setTasks([]);
      }
    }
  }, []);

  // Persiste no localStorage sempre que tasks mudar
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'pendente',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
    );
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'concluída' ? 'pendente' : 'concluída' }
          : t
      )
    );
  };

  const filteredAndSorted = tasks
    .filter((t) => (filter === 'todas' ? true : t.status === filter))
    .sort((a, b) => {
      if (sortBy === 'prioridade') {
        return (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3);
      }
      if (sortBy === 'titulo') {
        return a.title.localeCompare(b.title, 'pt-BR');
      }
      // data (padrão): mais recentes primeiro
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const stats = {
    total: tasks.length,
    pendente: tasks.filter((t) => t.status === 'pendente').length,
    concluída: tasks.filter((t) => t.status === 'concluída').length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredAndSorted,
        addTask,
        removeTask,
        editTask,
        toggleStatus,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        stats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

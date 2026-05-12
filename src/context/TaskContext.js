// src/context/TaskContext.js

import { createContext, useContext, useEffect, useState } from 'react';

export const TaskContext = createContext()

/* =========================
   CUSTOM HOOK
========================= */

export const useTaskContext = () => {
  const ctx = useContext(TaskContext)

  if (!ctx) {
    throw new Error('useTaskContext deve ser usado dentro de TaskProvider')
  }

  return ctx
}

/* =========================
   PRIORIDADES
========================= */

const PRIORITY_ORDER = {
  alta: 0,
  média: 1,
  baixa: 2,
}

/* =========================
   PROVIDER
========================= */

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const [filter, setFilter] = useState('todas')

  const [sortBy, setSortBy] = useState('data')

  const [search, setSearch] = useState('')

  /* =========================
     LOAD LOCAL STORAGE
  ========================= */

  useEffect(() => {
    const storedTasks = localStorage.getItem('taskflow_tasks')

    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks))
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error)

        setTasks([])
      }
    }
  }, [])

  /* =========================
     SAVE LOCAL STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks))
  }, [tasks])

  /* =========================
     ADD TASK
  ========================= */

  const addTask = task => {
    const newTask = {
      ...task,

      id: crypto.randomUUID(),

      createdAt: new Date().toISOString(),

      status: 'pendente',
    }

    setTasks(prev => [newTask, ...prev])
  }

  /* =========================
     REMOVE TASK
  ========================= */

  const removeTask = id => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  /* =========================
     EDIT TASK
  ========================= */

  const editTask = updatedTask => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    )
  }

  /* =========================
     TOGGLE STATUS
  ========================= */

  const toggleStatus = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,

              status: task.status === 'concluída' ? 'pendente' : 'concluída',
            }
          : task
      )
    )
  }

  /* =========================
     FILTER + SEARCH + SORT
  ========================= */

  const filteredAndSorted = [...tasks]
    .filter(task => {
      const matchesFilter = filter === 'todas' ? true : task.status === filter

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesFilter && matchesSearch
    })

    .sort((a, b) => {
      /* PRIORIDADE */

      if (sortBy === 'prioridade') {
        return (
          (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)
        )
      }

      /* TÍTULO */

      if (sortBy === 'titulo') {
        return a.title.localeCompare(b.title, 'pt-BR')
      }

      /* DATA */

      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  /* =========================
     STATS
  ========================= */

  const stats = {
    total: tasks.length,

    pendente: tasks.filter(task => task.status === 'pendente').length,

    concluída: tasks.filter(task => task.status === 'concluída').length,
  }

  /* =========================
     CONTEXT VALUE
  ========================= */

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

        search,
        setSearch,

        stats,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

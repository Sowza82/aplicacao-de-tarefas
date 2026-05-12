// src/pages/AddTask.js


import { useTaskContext } from '../context/TaskContext';

import TaskForm from '../components/TaskForm';

import './FormPage.css';

/* =========================
   COMPONENT
========================= */

const AddTask = () => {
  const { addTask } = useTaskContext()

  return (
    <main className="form-page">
      <div className="form-container">
        {/* HEADER */}

        <header className="form-header">
          <div className="form-header-icon">+</div>

          <h1 className="form-title">Nova Tarefa</h1>

          <p className="form-subtitle">
            Preencha os campos para criar uma nova tarefa.
          </p>
        </header>

        {/* FORM */}

        <TaskForm onSubmit={addTask} submitLabel="Criar Tarefa" />
      </div>
    </main>
  )
}

export default AddTask

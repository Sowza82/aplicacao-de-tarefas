// src/pages/EditTask.js


import { useNavigate, useParams } from 'react-router-dom';

import { useTaskContext } from '../context/TaskContext';

import TaskForm from '../components/TaskForm';

import './FormPage.css';

/* =========================
   COMPONENT
========================= */

const EditTask = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { tasks, editTask } = useTaskContext()

  /* =========================
     FIND TASK
  ========================= */

  const task = tasks.find(t => t.id === id)

  /* =========================
     TASK NOT FOUND
  ========================= */

  if (!task) {
    return (
      <main className="form-page">
        <div className="form-container">
          <div className="not-found">
            <h2 className="not-found-title">Tarefa não encontrada</h2>

            <p className="not-found-text">
              A tarefa pode ter sido removida ou não existe.
            </p>

            <button className="back-home-btn" onClick={() => navigate('/')}>
              ← Voltar para início
            </button>
          </div>
        </div>
      </main>
    )
  }

  /* =========================
     HANDLE EDIT
  ========================= */

  const handleEdit = updatedFields => {
    editTask({
      ...task,
      ...updatedFields,
    })
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <main className="form-page">
      <div className="form-container">
        {/* HEADER */}

        <header className="form-header">
          <div className="form-header-icon edit">✎</div>

          <h1 className="form-title">Editar Tarefa</h1>

          <p className="form-subtitle">
            Faça as alterações necessárias abaixo.
          </p>
        </header>

        {/* FORM */}

        <TaskForm
          initialData={{
            title: task.title,

            description: task.description || '',

            priority: task.priority || 'média',

            category: task.category || '',
          }}
          onSubmit={handleEdit}
          submitLabel="Salvar Alterações"
        />
      </div>
    </main>
  )
}

export default EditTask

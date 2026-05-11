import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import './FormPage.css';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, editTask } = useTaskContext();

  // Busca diretamente do localStorage para não depender do filtro ativo
  const allTasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
  const task = allTasks.find((t) => t.id === id);

  if (!task) {
    return (
      <main className="form-page">
        <div className="form-container">
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Tarefa não encontrada.{' '}
            <button
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => navigate('/')}
            >
              Voltar
            </button>
          </p>
        </div>
      </main>
    );
  }

  const handleEdit = (updatedFields) => {
    editTask({ ...task, ...updatedFields });
  };

  return (
    <main className="form-page">
      <div className="form-container">
        <header className="form-header">
          <div className="form-header-icon edit">✎</div>
          <h1 className="form-title">Editar Tarefa</h1>
          <p className="form-subtitle">Faça as alterações necessárias abaixo.</p>
        </header>
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
  );
};

export default EditTask;

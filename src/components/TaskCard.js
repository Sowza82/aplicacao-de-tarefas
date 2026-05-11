import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import './TaskCard.css';

const PRIORITY_LABELS = {
  alta: { label: 'Alta', color: 'high' },
  média: { label: 'Média', color: 'mid' },
  baixa: { label: 'Baixa', color: 'low' },
};

const TaskCard = ({ task }) => {
  const { removeTask, toggleStatus } = useTaskContext();
  const navigate = useNavigate();
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeTask(task.id), 280);
  };

  const priority = PRIORITY_LABELS[task.priority] || { label: task.priority, color: 'low' };

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short',
    });
  };

  return (
    <article className={`task-card ${task.status === 'concluída' ? 'done' : ''} ${removing ? 'removing' : ''}`}>
      <div className="task-card-left">
        <button
          className={`task-check ${task.status === 'concluída' ? 'checked' : ''}`}
          onClick={() => toggleStatus(task.id)}
          title={task.status === 'concluída' ? 'Marcar como pendente' : 'Marcar como concluída'}
          aria-label="Alternar status da tarefa"
        >
          {task.status === 'concluída' && (
            <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
              <polyline points="2,8 6,12 14,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      <div className="task-card-body">
        <div className="task-card-meta">
          <span className={`priority-badge ${priority.color}`}>{priority.label}</span>
          {task.category && <span className="category-badge">{task.category}</span>}
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-card-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => navigate(`/edit-task/${task.id}`)}
          title="Editar tarefa"
          aria-label="Editar"
        >
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="action-btn delete-btn"
          onClick={handleRemove}
          title="Excluir tarefa"
          aria-label="Excluir"
        >
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <polyline points="3,4 13,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="4" y="4" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>
    </article>
  );
};

export default TaskCard;

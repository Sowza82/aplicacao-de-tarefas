// src/components/TaskForm.js

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './TaskForm.css';

/* =========================
   DEFAULT FORM STATE
========================= */

const EMPTY = {
  title: '',
  description: '',
  priority: 'média',
  category: '',
}

/* =========================
   COMPONENT
========================= */

const TaskForm = ({ initialData, onSubmit, submitLabel = 'Salvar Tarefa' }) => {
  const navigate = useNavigate()

  const [form, setForm] = useState(initialData || EMPTY)

  const [errors, setErrors] = useState({})

  const [loading, setLoading] = useState(false)

  /* =========================
     VALIDATION
  ========================= */

  const validate = () => {
    const e = {}

    if (!form.title.trim()) {
      e.title = 'O título é obrigatório.'
    } else if (form.title.trim().length < 3) {
      e.title = 'Mínimo de 3 caracteres.'
    }

    return e
  }

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = e => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value,
    }))

    /* limpa erro ao digitar */

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async e => {
    e.preventDefault()

    const errs = validate()

    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)

    /* micro feedback UX */

    await new Promise(resolve => setTimeout(resolve, 300))

    onSubmit({
      ...form,

      title: form.title.trim(),

      description: form.description.trim(),
    })

    setLoading(false)

    navigate('/')
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      {/* TITLE */}

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Título <span className="required">*</span>
        </label>

        <input
          id="title"
          name="title"
          type="text"
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="Ex: Estudar React Router..."
          value={form.title}
          onChange={handleChange}
          maxLength={100}
          autoFocus
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />

        {errors.title && (
          <span id="title-error" className="form-error">
            {errors.title}
          </span>
        )}
      </div>

      {/* DESCRIPTION */}

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Descrição
        </label>

        <textarea
          id="description"
          name="description"
          className="form-input form-textarea"
          placeholder="Adicione detalhes sobre a tarefa..."
          value={form.description}
          onChange={handleChange}
          maxLength={500}
          rows={4}
        />

        <span className="char-count">{form.description.length}/500</span>
      </div>

      {/* ROW */}

      <div className="form-row">
        {/* PRIORITY */}

        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Prioridade
          </label>

          <select
            id="priority"
            name="priority"
            className="form-input form-select"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="alta">🔴 Alta</option>

            <option value="média">🟡 Média</option>

            <option value="baixa">🟢 Baixa</option>
          </select>
        </div>

        {/* CATEGORY */}

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Categoria
          </label>

          <input
            id="category"
            name="category"
            type="text"
            className="form-input"
            placeholder="Ex: Estudos, Trabalho..."
            value={form.category}
            onChange={handleChange}
            maxLength={30}
          />
        </div>
      </div>

      {/* ACTIONS */}

      <div className="form-actions">
        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate('/')}
        >
          Cancelar
        </button>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? (
            <span className="btn-loading">
              <svg
                className="spin-icon"
                viewBox="0 0 16 16"
                fill="none"
                width="14"
                height="14"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="25 10"
                />
              </svg>
              Salvando...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  )
}

export default TaskForm

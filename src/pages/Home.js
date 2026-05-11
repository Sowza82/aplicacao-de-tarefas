import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import './Home.css';

const Home = () => {
  const { tasks, filter, setFilter, sortBy, setSortBy, stats } = useTaskContext();

  return (
    <main className="home-page">
      {/* Ambient glow */}
      <div className="ambient" />

      <div className="page-container">
        <header className="page-header">
          <div>
            <h1 className="page-title">Minhas Tarefas</h1>
            <p className="page-subtitle">
              {stats.pendente > 0
                ? `${stats.pendente} tarefa${stats.pendente > 1 ? 's' : ''} pendente${stats.pendente > 1 ? 's' : ''}`
                : 'Tudo em dia! 🎉'}
            </p>
          </div>
          <Link to="/add-task" className="header-cta">
            + Nova
          </Link>
        </header>

        {/* Controls */}
        <div className="controls">
          <div className="filter-tabs">
            {['todas', 'pendente', 'concluída'].map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'todas' && <span className="tab-count">{stats.total}</span>}
                {f === 'pendente' && <span className="tab-count accent">{stats.pendente}</span>}
                {f === 'concluída' && <span className="tab-count success">{stats.concluída}</span>}
              </button>
            ))}
          </div>

          <div className="sort-control">
            <label htmlFor="sort" className="sort-label">Ordenar:</label>
            <select
              id="sort"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="data">Mais recentes</option>
              <option value="prioridade">Prioridade</option>
              <option value="titulo">Título A–Z</option>
            </select>
          </div>
        </div>

        {/* Task list */}
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◯</div>
            <p className="empty-title">
              {filter === 'todas' ? 'Nenhuma tarefa ainda' : `Nenhuma tarefa ${filter}`}
            </p>
            <p className="empty-sub">
              {filter === 'todas'
                ? 'Crie sua primeira tarefa para começar.'
                : 'Tente mudar o filtro para ver outras tarefas.'}
            </p>
            {filter === 'todas' && (
              <Link to="/add-task" className="empty-cta">
                Criar Tarefa
              </Link>
            )}
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;

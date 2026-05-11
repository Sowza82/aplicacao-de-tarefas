import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { stats } = useTaskContext();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-name">TaskFlow</span>
        </Link>

        <div className="navbar-stats">
          <span className="stat">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-label">total</span>
          </span>
          <span className="stat-divider" />
          <span className="stat">
            <span className="stat-num pending">{stats.pendente}</span>
            <span className="stat-label">pendentes</span>
          </span>
          <span className="stat-divider" />
          <span className="stat">
            <span className="stat-num done">{stats.concluída}</span>
            <span className="stat-label">concluídas</span>
          </span>
        </div>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Tarefas
          </Link>
          <Link
            to="/add-task"
            className={`nav-link nav-cta ${location.pathname === '/add-task' ? 'active' : ''}`}
          >
            + Nova Tarefa
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/App.js

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { TaskProvider } from './context/TaskContext';

import Navbar from './components/Navbar';

import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Home from './pages/Home';

import './App.css';

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <div className="app">
          <Navbar />

          <main className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/add-task" element={<AddTask />} />

              <Route path="/edit-task/:id" element={<EditTask />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </Router>
  )
}

export default App

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTechnologies } from '../utils/technologiesStorage';

function Dashboard({ username }) {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    setTechnologies(getAllTechnologies());
  }, []);

  const completedCount = technologies.filter(t => t.status === 'completed').length;

  return (
    <div className="page">
      <h1>Панель управления</h1>
      <p>Добро пожаловать, {username}!</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Всего технологий</h3>
          <p className="big-number">{technologies.length}</p>
          <Link to="/technologies" className="btn-link">Смотреть все →</Link>
        </div>

        <div className="dashboard-card">
          <h3>Завершено</h3>
          <p className="big-number">{completedCount}</p>
          <Link to="/statistics" className="btn-link">Статистика →</Link>
        </div>

        <div className="dashboard-card">
          <h3>Добавить новую</h3>
          <p>Расширьте свой набор технологий</p>
          <Link to="/add-technology" className="btn-link">Добавить →</Link>
        </div>
      </div>

      <div className="recent-technologies">
        <h2>Недавно добавленные</h2>
        {technologies.length > 0 ? (
          <ul>
            {technologies.slice(-5).reverse().map(tech => (
              <li key={tech.id}>
                <Link to={`/technology/${tech.id}`}>{tech.title}</Link>
                <span className={`status status-${tech.status}`}>{tech.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет технологий. <Link to="/add-technology">Добавьте первую</Link></p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

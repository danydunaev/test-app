import { useEffect, useState } from 'react';
import { getStatistics } from '../utils/technologiesStorage';

function Statistics() {
  const [stats, setStats] = useState({
    total: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const statsData = getStatistics();
    setStats({
      total: statsData.total,
      notStarted: statsData.notStarted,
      inProgress: statsData.inProgress,
      completed: statsData.completed
    });
  }, []);

  const progressPercent = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Get CSS variables from computed style
  const getCSSVariables = () => {
    const root = document.documentElement;
    return {
      borderColor: getComputedVariable(root, '--color-border') || '#e2e8f0',
      notStartedColor: getComputedVariable(root, '--color-warning') || '#f39c12',
      inProgressColor: getComputedVariable(root, '--color-info') || '#3498db',
      completedColor: getComputedVariable(root, '--color-success') || '#27ae60',
      textColor: getComputedVariable(root, '--color-text-primary') || '#1E293B'
    };
  };

  const getComputedVariable = (element, varName) => {
    return window.getComputedStyle(element).getPropertyValue(varName).trim();
  };

  const styles = getCSSVariables();

  return (
    <div className="page">
      <h1>Статистика</h1>
      
      <div className="stats-container">
        <div className="stats-summary">
          <div className="stat-card">
            <h3>Всего технологий</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Не начато</h3>
            <p className="stat-number">{stats.notStarted}</p>
          </div>
          <div className="stat-card">
            <h3>В процессе</h3>
            <p className="stat-number">{stats.inProgress}</p>
          </div>
          <div className="stat-card">
            <h3>Завершено</h3>
            <p className="stat-number">{stats.completed}</p>
          </div>
        </div>

        <div className="progress-section">
          <h3>Общий прогресс: {progressPercent}%</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="stats-chart">
          <h3>Распределение по статусам</h3>
          <div style={{ display: 'flex', height: 40, borderRadius: 6, overflow: 'hidden', border: `1px solid ${styles.borderColor}` }}>
            <div 
              style={{
                width: `${stats.total ? (stats.notStarted / stats.total) * 100 : 0}%`,
                background: styles.notStartedColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }} 
              title={`Не начато: ${stats.notStarted}`}
            >
              {stats.notStarted > 0 && `${stats.notStarted}`}
            </div>
            <div 
              style={{
                width: `${stats.total ? (stats.inProgress / stats.total) * 100 : 0}%`,
                background: styles.inProgressColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }} 
              title={`В процессе: ${stats.inProgress}`}
            >
              {stats.inProgress > 0 && `${stats.inProgress}`}
            </div>
            <div 
              style={{
                width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%`,
                background: styles.completedColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }} 
              title={`Завершено: ${stats.completed}`}
            >
              {stats.completed > 0 && `${stats.completed}`}
            </div>
          </div>
          <div style={{ fontSize: 12, marginTop: 12, display: 'flex', gap: '20px' }}>
            <span><span style={{ color: '#bdc3c7' }}>■</span> Не начато</span>
            <span><span style={{ color: '#f39c12' }}>■</span> В процессе</span>
            <span><span style={{ color: '#27ae60' }}>■</span> Завершено</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;

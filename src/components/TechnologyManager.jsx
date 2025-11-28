import { useState } from 'react';
import TechnologyForm from './TechnologyForm';
import '../styles/TechnologyManager.css';

function TechnologyManager() {
  const [technologies, setTechnologies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Обработчик сохранения технологии
  const handleSaveTechnology = (techData) => {
    if (editingTech) {
      // Редактирование существующей технологии
      setTechnologies(prev => 
        prev.map(tech => 
          tech.id === editingTech.id 
            ? { ...tech, ...techData, updatedAt: new Date().toISOString() }
            : tech
        )
      );
      setSuccessMessage('✅ Технология успешно обновлена');
    } else {
      // Добавление новой технологии
      const newTechnology = {
        id: Date.now() + Math.random(), // В реальном приложении ID генерируется на сервере
        ...techData,
        status: 'not-started',
        createdAt: new Date().toISOString(),
        notes: '',
        progress: 0
      };
      setTechnologies(prev => [...prev, newTechnology]);
      setSuccessMessage('✅ Новая технология успешно добавлена');
    }
    
    // Закрываем форму после сохранения
    setShowForm(false);
    setEditingTech(null);

    // Скрываем сообщение через 3 секунды
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Обработчик редактирования
  const handleEdit = (technology) => {
    setEditingTech(technology);
    setShowForm(true);
  };

  // Обработчик удаления
  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      setTechnologies(prev => prev.filter(tech => tech.id !== id));
      setSuccessMessage('✅ Технология удалена');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Обработчик отмены
  const handleCancel = () => {
    setShowForm(false);
    setEditingTech(null);
  };

  // Изменение статуса
  const handleStatusChange = (id) => {
    setTechnologies(prev => 
      prev.map(tech => {
        if (tech.id === id) {
          const statuses = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statuses.indexOf(tech.status);
          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
          return { ...tech, status: nextStatus };
        }
        return tech;
      })
    );
  };

  // Получить лейбл статуса
  const getStatusLabel = (status) => {
    const labels = {
      'not-started': '⏳ Не начато',
      'in-progress': '🔄 В процессе',
      'completed': '✅ Завершено'
    };
    return labels[status] || status;
  };

  return (
    <div className="technology-manager-container">
      <div className="technology-manager">
        <div className="manager-header">
          <div>
            <h1>Управление технологиями</h1>
            <p className="header-subtitle">Добавляйте, редактируйте и отслеживайте технологии для изучения</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary btn-large"
            aria-label="Добавить новую технологию"
          >
            + Добавить технологию
          </button>
        </div>

        {/* Сообщение об успехе */}
        {successMessage && (
          <div className="success-message" role="status" aria-live="polite">
            {successMessage}
          </div>
        )}

        {/* Список технологий */}
        <div className="technologies-list">
          {technologies.length === 0 ? (
            <div className="empty-state">
              <p>📚 Технологий пока нет</p>
              <p className="empty-state-hint">Нажмите кнопку выше, чтобы добавить первую технологию</p>
            </div>
          ) : (
            <div className="technologies-grid">
              {technologies.map(tech => (
                <div key={tech.id} className="technology-card">
                  <div className="tech-header">
                    <h3>{tech.title}</h3>
                    <span className="category-badge">{tech.category}</span>
                  </div>
                  
                  <p className="tech-description">{tech.description}</p>
                  
                  <div className="tech-meta">
                    <div className="meta-item">
                      <span className="meta-label">Сложность:</span>
                      <span className="meta-value">{tech.difficulty}</span>
                    </div>
                    {tech.deadline && (
                      <div className="meta-item">
                        <span className="meta-label">Дедлайн:</span>
                        <span className="meta-value">{new Date(tech.deadline).toLocaleDateString('ru-RU')}</span>
                      </div>
                    )}
                  </div>

                  {tech.resources && tech.resources.length > 0 && (
                    <div className="tech-resources">
                      <span className="resources-label">Ресурсы:</span>
                      <div className="resources-list">
                        {tech.resources.map((resource, idx) => (
                          <a 
                            key={idx} 
                            href={resource} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="resource-link"
                            aria-label={`Ресурс ${idx + 1}`}
                          >
                            🔗 Ресурс {idx + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="tech-actions">
                    <button 
                      onClick={() => handleStatusChange(tech.id)}
                      className={`status-btn status-${tech.status}`}
                      aria-label={`Текущий статус: ${getStatusLabel(tech.status)}, нажмите для изменения`}
                    >
                      {getStatusLabel(tech.status)}
                    </button>
                    
                    <button 
                      onClick={() => handleEdit(tech)}
                      className="btn-secondary btn-small"
                      aria-label={`Редактировать технологию ${tech.title}`}
                    >
                      ✏️ Редактировать
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(tech.id)}
                      className="btn-danger btn-small"
                      aria-label={`Удалить технологию ${tech.title}`}
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Статистика */}
        {technologies.length > 0 && (
          <div className="statistics">
            <h2>Статистика</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{technologies.length}</div>
                <div className="stat-label">Всего технологий</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{technologies.filter(t => t.status === 'not-started').length}</div>
                <div className="stat-label">Не начато</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{technologies.filter(t => t.status === 'in-progress').length}</div>
                <div className="stat-label">В процессе</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{technologies.filter(t => t.status === 'completed').length}</div>
                <div className="stat-label">Завершено</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Форма добавления/редактирования */}
      {showForm && (
        <div className="form-modal-overlay" onClick={handleCancel}>
          <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
            <TechnologyForm
              onSave={handleSaveTechnology}
              onCancel={handleCancel}
              initialData={editingTech || {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyManager;

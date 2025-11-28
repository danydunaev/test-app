import { useState, useEffect } from 'react';
import '../styles/DataImportExport.css';
import { getAllTechnologies, addTechnology, updateTechnology, deleteTechnology } from '../utils/technologiesStorage';

function DataImportExport() {
  const [technologies, setTechnologies] = useState([]);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');

  // Загрузка данных из centralized storage при старте
  useEffect(() => {
    const loadedTechs = getAllTechnologies();
    setTechnologies(loadedTechs);
    if (loadedTechs.length > 0) {
      setStatus(`Загружено ${loadedTechs.length} технологий`);
      setStatusType('success');
      setTimeout(() => setStatus(''), 3000);
    }
  }, []);

  // Экспорт данных в JSON файл
  const handleExport = () => {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      technologies: technologies,
      stats: {
        total: technologies.length,
        completed: technologies.filter(t => t.status === 'completed').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatus(`📥 Экспортировано ${technologies.length} технологий`);
    setStatusType('success');
    setTimeout(() => setStatus(''), 3000);
  };

  // Импорт данных из JSON файла
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const importedData = JSON.parse(fileContent);
        
        // Проверяем структуру файла
        if (!importedData.technologies || !Array.isArray(importedData.technologies)) {
          throw new Error('Неверный формат файла: отсутствует массив technologies');
        }

        // Валидация каждой технологии
        const validTechnologies = importedData.technologies.filter(tech => 
          tech && tech.id && tech.title && tech.description
        );

        if (validTechnologies.length === 0) {
          throw new Error('В файле нет валидных технологий');
        }

        // Добавляем импортированные технологии через utility
        validTechnologies.forEach(tech => {
          const existingTech = getAllTechnologies().find(t => t.id === tech.id);
          if (!existingTech) {
            addTechnology(tech);
          }
        });

        // Перезагружаем список из centralized storage
        setTechnologies(getAllTechnologies());
        setStatus(`📤 Импортировано ${validTechnologies.length} технологий`);
        setStatusType('success');
        
      } catch (error) {
        setStatus(`❌ Ошибка импорта: ${error.message}`);
        setStatusType('error');
      }
    };

    reader.onerror = () => {
      setStatus('❌ Ошибка чтения файла');
      setStatusType('error');
    };

    reader.readAsText(file);
    // Сбрасываем input чтобы можно было выбрать тот же файл снова
    event.target.value = '';
  };

  // Добавление тестовой технологии
  const addSampleTechnology = () => {
    const newTech = {
      title: `Технология ${technologies.length + 1}`,
      description: 'Описание технологии для демонстрации. Это полезная технология для изучения.',
      status: 'not-started',
      category: 'frontend',
      difficulty: 'beginner',
      createdAt: new Date().toISOString(),
      resources: []
    };
    
    addTechnology(newTech);
    setTechnologies(getAllTechnologies());
    setStatus('✅ Добавлена тестовая технология');
    setStatusType('success');
    setTimeout(() => setStatus(''), 3000);
  };

  // Очистка всех данных
  const clearAllData = () => {
    if (window.confirm('⚠️ Вы уверены? Это удалит ВСЕ данные!')) {
      getAllTechnologies().forEach(tech => {
        deleteTechnology(tech.id);
      });
      setTechnologies([]);
      setStatus('🗑️ Все данные очищены');
      setStatusType('info');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  // Изменение статуса технологии
  const toggleStatus = (techId) => {
    const statuses = ['not-started', 'in-progress', 'completed'];
    const tech = technologies.find(t => t.id === techId);
    
    if (tech) {
      const currentIndex = statuses.indexOf(tech.status);
      const nextStatus = statuses[(currentIndex + 1) % statuses.length];
      updateTechnology(techId, { status: nextStatus });
      setTechnologies(getAllTechnologies());
    }
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
    <div className="import-export-container">
      <h1>📊 Импорт/Экспорт данных</h1>
      
      {/* Статус */}
      {status && (
        <div className={`status-message status-${statusType}`} role="status" aria-live="polite">
          {status}
        </div>
      )}

      {/* Управление данными */}
      <div className="controls-section">
        <h2>Управление данными</h2>
        <div className="button-group">
          <button
            onClick={addSampleTechnology}
            className="btn-action btn-add"
            aria-label="Добавить тестовую технологию"
          >
            + Добавить тестовую технологию
          </button>

          <button
            onClick={handleExport}
            disabled={technologies.length === 0}
            className="btn-action btn-export"
            aria-label={`Экспортировать ${technologies.length} технологий в JSON`}
          >
            📥 Экспорт в JSON ({technologies.length})
          </button>

          <label className="btn-action btn-import">
            📤 Импорт из JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="file-input-hidden"
              aria-label="Загрузить JSON файл с технологиями"
            />
          </label>

          <button
            onClick={clearAllData}
            disabled={technologies.length === 0}
            className="btn-action btn-delete"
            aria-label="Очистить все данные"
          >
            🗑️ Очистить все
          </button>
        </div>
      </div>

      {/* Список технологий */}
      <div className="technologies-section">
        <h2>Технологии ({technologies.length})</h2>
        
        {technologies.length === 0 ? (
          <div className="empty-state-large">
            <p className="empty-icon">📚</p>
            <p className="empty-title">Технологий пока нет</p>
            <p className="empty-hint">Добавьте первую технологию или импортируйте данные из JSON файла</p>
          </div>
        ) : (
          <div className="technologies-grid-large">
            {technologies.map(tech => (
              <div
                key={tech.id}
                className="tech-item-large"
              >
                <div className="tech-item-header">
                  <div>
                    <h3 className="tech-title">{tech.title}</h3>
                    <p className="tech-category">{tech.category}</p>
                  </div>
                  <button
                    onClick={() => toggleStatus(tech.id)}
                    className={`status-button status-${tech.status}`}
                    aria-label={`Статус: ${getStatusLabel(tech.status)}, нажмите для изменения`}
                  >
                    {getStatusLabel(tech.status)}
                  </button>
                </div>

                <p className="tech-description">{tech.description}</p>
                
                <div className="tech-meta-info">
                  {tech.difficulty && (
                    <span className="meta-badge">🎓 {tech.difficulty}</span>
                  )}
                  {tech.createdAt && (
                    <span className="meta-badge">📅 {new Date(tech.createdAt).toLocaleDateString('ru-RU')}</span>
                  )}
                  <span className="meta-badge">🔑 ID: {tech.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Статистика */}
      {technologies.length > 0 && (
        <div className="statistics-section">
          <h2>Статистика</h2>
          <div className="stats-cards">
            <div className="stat-card stat-total">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{technologies.length}</div>
                <div className="stat-name">Всего технологий</div>
              </div>
            </div>
            <div className="stat-card stat-not-started">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <div className="stat-value">{technologies.filter(t => t.status === 'not-started').length}</div>
                <div className="stat-name">Не начато</div>
              </div>
            </div>
            <div className="stat-card stat-in-progress">
              <div className="stat-icon">🔄</div>
              <div className="stat-content">
                <div className="stat-value">{technologies.filter(t => t.status === 'in-progress').length}</div>
                <div className="stat-name">В процессе</div>
              </div>
            </div>
            <div className="stat-card stat-completed">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">{technologies.filter(t => t.status === 'completed').length}</div>
                <div className="stat-name">Завершено</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Информация */}
      <div className="info-section">
        <h2>ℹ️ Как использовать</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Добавление</h3>
            <p>Нажмите кнопку "Добавить тестовую технологию" для быстрого добавления примера.</p>
          </div>
          <div className="info-card">
            <h3>Экспорт</h3>
            <p>Сохраните ваши технологии в JSON файл для резервной копии или обмена с коллегами.</p>
          </div>
          <div className="info-card">
            <h3>Импорт</h3>
            <p>Загрузите JSON файл с технологиями. Новые элементы будут добавлены к существующим.</p>
          </div>
          <div className="info-card">
            <h3>Статусы</h3>
            <p>Нажимайте на кнопку статуса, чтобы циклически менять: Не начато → В процессе → Завершено.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataImportExport;

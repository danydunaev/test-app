import { useState } from 'react';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import './RoadmapImporter.css';

function RoadmapImporter() {
  const { addTechnology, deleteTechnology, technologies } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState(null);

  // Пример дорожных карт для импорта
  const roadmaps = {
    frontend: {
      name: 'Frontend дорожная карта',
      technologies: [
        {
          title: 'HTML5',
          description: 'Язык разметки для веб-страниц',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://developer.mozilla.org/en-US/docs/Web/HTML']
        },
        {
          title: 'CSS3',
          description: 'Язык стилей для веб-страниц',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://developer.mozilla.org/en-US/docs/Web/CSS']
        },
        {
          title: 'JavaScript',
          description: 'Язык программирования для веб-приложений',
          category: 'frontend',
          difficulty: 'intermediate',
          resources: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript']
        },
        {
          title: 'Vue.js',
          description: 'Прогрессивный фреймворк для веб-приложений',
          category: 'frontend',
          difficulty: 'intermediate',
          resources: ['https://vuejs.org', 'https://vuejs.org/guide/']
        }
      ]
    },
    backend: {
      name: 'Backend дорожная карта',
      technologies: [
        {
          title: 'Express.js',
          description: 'Минималистичный веб-фреймворк для Node.js',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://expressjs.com']
        },
        {
          title: 'Python',
          description: 'Язык программирования высокого уровня',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://www.python.org', 'https://docs.python.org']
        },
        {
          title: 'PostgreSQL',
          description: 'Мощная реляционная база данных',
          category: 'database',
          difficulty: 'intermediate',
          resources: ['https://www.postgresql.org']
        },
        {
          title: 'Docker',
          description: 'Контейнеризация приложений',
          category: 'devops',
          difficulty: 'intermediate',
          resources: ['https://www.docker.com', 'https://docs.docker.com']
        }
      ]
    },
    fullstack: {
      name: 'FullStack дорожная карта',
      technologies: [
        {
          title: 'Git',
          description: 'Система контроля версий',
          category: 'tools',
          difficulty: 'beginner',
          resources: ['https://git-scm.com', 'https://git-scm.com/doc']
        },
        {
          title: 'REST API',
          description: 'Архитектурный стиль для веб-сервисов',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://restfulapi.net']
        },
        {
          title: 'GraphQL',
          description: 'Язык запросов для API',
          category: 'backend',
          difficulty: 'advanced',
          resources: ['https://graphql.org', 'https://graphql.org/learn/']
        },
        {
          title: 'MongoDB',
          description: 'NoSQL база данных',
          category: 'database',
          difficulty: 'intermediate',
          resources: ['https://www.mongodb.com', 'https://docs.mongodb.com']
        }
      ]
    }
  };

  const handleImportRoadmap = async (roadmapKey) => {
    try {
      setImporting(true);
      setMessage(null);
      
      const roadmap = roadmaps[roadmapKey];
      
      // Добавляем каждую технологию из дорожной карты
      let count = 0;
      for (const tech of roadmap.technologies) {
        try {
          addTechnology(tech);
          count++;
          // Небольшая задержка между добавлениями для визуального эффекта
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (err) {
          console.error(`Ошибка при добавлении ${tech.title}:`, err);
        }
      }
      
      setMessage({
        type: 'success',
        text: `✅ Успешно импортировано ${count} технологий из "${roadmap.name}"`
      });
      
    } catch (err) {
      setMessage({
        type: 'error',
        text: `❌ Ошибка импорта: ${err.message}`
      });
    } finally {
      setImporting(false);
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('⚠️ Вы уверены? Это удалит ВСЕ технологии!')) {
      try {
        setImporting(true);
        const techsToDelete = [...technologies]; // Копируем чтобы избежать race condition
        let count = 0;
        
        for (const tech of techsToDelete) {
          try {
            deleteTechnology(tech.id);
            count++;
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (err) {
            console.error(`Ошибка при удалении ${tech.title}:`, err);
          }
        }
        
        setMessage({
          type: 'success',
          text: `✅ Успешно удалено ${count} технологий`
        });
      } catch (err) {
        setMessage({
          type: 'error',
          text: `❌ Ошибка удаления: ${err.message}`
        });
      } finally {
        setImporting(false);
      }
    }
  };

  return (
    <div className="roadmap-importer">
      <div className="importer-header">
        <h3>📚 Импорт дорожных карт</h3>
        <p>Импортируйте наборы технологий для различных направлений разработки</p>
      </div>
      
      {message && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="import-section">
        <div className="section-label">📥 Импортировать дорожную карту:</div>
        <div className="import-actions">
          <button 
            onClick={() => handleImportRoadmap('frontend')}
            disabled={importing}
            className="import-button"
          >
            {importing ? '⏳ Импорт...' : '🎨 Frontend'}
          </button>
          
          <button 
            onClick={() => handleImportRoadmap('backend')}
            disabled={importing}
            className="import-button"
          >
            {importing ? '⏳ Импорт...' : '⚙️ Backend'}
          </button>
          
          <button 
            onClick={() => handleImportRoadmap('fullstack')}
            disabled={importing}
            className="import-button"
          >
            {importing ? '⏳ Импорт...' : '🚀 FullStack'}
          </button>
        </div>
      </div>

      {technologies.length > 0 && (
        <div className="delete-section">
          <div className="section-label">🗑️ Управление:</div>
          <button 
            onClick={handleDeleteAll}
            disabled={importing}
            className="delete-all-button"
          >
            {importing ? '⏳ Удаление...' : '🗑️ Удалить ВСЕ'}
          </button>
          <span className="tech-count">Загружено: {technologies.length} технологий</span>
        </div>
      )}
    </div>
  );
}

export default RoadmapImporter;

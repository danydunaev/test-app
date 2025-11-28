import { useState } from 'react';
import UserList from '../UserList';
import ProductSearch from '../ProductSearch';
import PostList from '../PostList';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import TechnologySearch from '../TechnologySearch';
import RoadmapImporter from '../RoadmapImporter';
import './ApiDemo.css';

function ApiDemo() {
  const [activeTab, setActiveTab] = useState('users');
  const { technologies, addTechnology, deleteTechnology } = useTechnologiesApi();

  const handleSelectTechnology = async (tech) => {
    try {
      await addTechnology(tech);
      alert(`✅ Технология "${tech.title}" добавлена!`);
    } catch (err) {
      alert(`❌ Ошибка: ${err.message}`);
    }
  };

  const handleDeleteTech = async (id, title) => {
    if (window.confirm(`Удалить "${title}"?`)) {
      try {
        await deleteTechnology(id);
        alert(`✅ Технология удалена!`);
      } catch (err) {
        alert(`❌ Ошибка: ${err.message}`);
      }
    }
  };

  return (
    <div className="api-demo">
      <div className="api-demo-header">
        <h1>🌐 Практическое занятие 24: Работа с API в React</h1>
        <p>Изучайте примеры загрузки и обработки данных из различных API</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Пользователи
        </button>
        <button 
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          🛍️ Поиск товаров
        </button>
        <button 
          className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          📚 Статьи
        </button>
        <button 
          className={`tab-button ${activeTab === 'technologies' ? 'active' : ''}`}
          onClick={() => setActiveTab('technologies')}
        >
          🚀 Дорожная карта
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'users' && (
          <div className="tab-panel">
            <div className="section-info">
              <h2>👥 Пример 1: Базовый запрос к API</h2>
              <p>
                Компонент загружает список пользователей с https://jsonplaceholder.typicode.com/users.
                Демонстрирует обработку состояний загрузки, ошибок и повторной загрузки данных.
              </p>
              <div className="key-concepts">
                <span className="concept">✅ fetch API</span>
                <span className="concept">✅ useState</span>
                <span className="concept">✅ useEffect</span>
                <span className="concept">✅ Обработка ошибок</span>
              </div>
            </div>
            <div className="component-wrapper">
              <UserList />
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="tab-panel">
            <div className="section-info">
              <h2>🔍 Пример 2: Поиск с Debounce и отмена запросов</h2>
              <p>
                Компонент демонстрирует оптимизацию запросов с помощью debounce 
                и отмену предыдущих запросов через AbortController.
              </p>
              <div className="key-concepts">
                <span className="concept">✅ debounce (500ms)</span>
                <span className="concept">✅ AbortController</span>
                <span className="concept">✅ useRef</span>
                <span className="concept">✅ Отмена запросов</span>
              </div>
              <p className="example-hint">
                💡 Попробуйте: введите "Essence" или "Phone" для поиска товаров
              </p>
            </div>
            <div className="component-wrapper">
              <ProductSearch />
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="tab-panel">
            <div className="section-info">
              <h2>� Пример 3: Кастомный хук useApi с параметрами</h2>
              <p>
                Компонент демонстрирует работу с кастомным хуком `useApi` для загрузки статей.
                Особенность: использование `refreshKey` для принудительного обновления данных.
              </p>
              <div className="key-concepts">
                <span className="concept">✅ Custom Hook useApi</span>
                <span className="concept">✅ useState для refresh</span>
                <span className="concept">✅ Параметры URL</span>
                <span className="concept">✅ AbortController & cache</span>
              </div>
              <p className="example-hint">
                💡 Функциональность: нажмите "🔄 Обновить" для загрузки новых статей из API
              </p>
            </div>
            <div className="component-wrapper">
              <PostList />
            </div>
          </div>
        )}

        {activeTab === 'technologies' && (
          <div className="tab-panel">
            <div className="section-info">
              <h2>🚀 Интеграция API: Управление технологиями</h2>
              <p>
                Полная интеграция нескольких компонентов для управления дорожной картой:
              </p>
              <ul className="features-list">
                <li>📚 <strong>Импорт дорожных карт</strong> - готовые наборы технологий</li>
                <li>🔎 <strong>Поиск с debounce</strong> - быстрый поиск по названию</li>
                <li>💾 <strong>LocalStorage</strong> - сохранение данных в браузере</li>
                <li>➕ <strong>CRUD операции</strong> - управление технологиями</li>
              </ul>
            </div>

            <div className="technologies-section">
              <RoadmapImporter />

              <div className="search-section">
                <h3>🔎 Поиск технологий</h3>
                <p>Введите название технологии для поиска и выберите из результатов:</p>
                <TechnologySearch 
                  technologies={technologies}
                  onSelect={handleSelectTechnology}
                />
              </div>

              <div className="technologies-list">
                <h3>📚 Добавленные технологии ({technologies.length})</h3>
                
                {technologies.length === 0 ? (
                  <p className="empty-message">
                    🎯 Импортируйте дорожную карту через кнопки выше или добавьте технологию через поиск
                  </p>
                ) : (
                  <div className="tech-grid">
                    {technologies.map(tech => (
                      <div key={tech.id} className="tech-card">
                        <div className="tech-card-header">
                          <div className="tech-title-section">
                            <h4>{tech.title}</h4>
                            <span className="tech-category">{tech.category}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteTech(tech.id, tech.title)}
                            className="delete-tech-btn"
                            title="Удалить технологию"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="tech-description">{tech.description}</p>
                        <div className="tech-footer">
                          <span className={`tech-difficulty ${tech.difficulty}`}>
                            {tech.difficulty === 'beginner' && '🟢 Beginner'}
                            {tech.difficulty === 'intermediate' && '🟡 Intermediate'}
                            {tech.difficulty === 'advanced' && '🔴 Advanced'}
                          </span>
                        </div>
                        {tech.resources && tech.resources.length > 0 && (
                          <div className="tech-resources">
                            <p><strong>📖 Ресурсы:</strong></p>
                            <ul>
                              {tech.resources.map((resource, idx) => (
                                <li key={idx}>
                                  <a href={resource} target="_blank" rel="noopener noreferrer">
                                    {resource.replace(/^https?:\/\//, '').substring(0, 40)}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Информационный раздел показывается только для основной страницы */}
      {activeTab === 'users' && (
        <div className="learning-info-panel">
          <div className="info-container">
            <h3>📚 Что вы изучите в этом примере:</h3>
            <div className="concepts-grid">
              <div className="concept-item">
                <span className="concept-icon">🎯</span>
                <div className="concept-text">
                  <strong>Базовые запросы</strong>
                  <p>Работа с fetch API и загрузка данных</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">⚙️</span>
                <div className="concept-text">
                  <strong>Управление состояниями</strong>
                  <p>loading, error, success состояния</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">🔄</span>
                <div className="concept-text">
                  <strong>Повторная загрузка</strong>
                  <p>Обработка ошибок и retry логика</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="learning-info-panel">
          <div className="info-container">
            <h3>📚 Ключевые концепции в этом примере:</h3>
            <div className="concepts-grid">
              <div className="concept-item">
                <span className="concept-icon">⏱️</span>
                <div className="concept-text">
                  <strong>Debounce</strong>
                  <p>Задержка 500ms для оптимизации</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">🛑</span>
                <div className="concept-text">
                  <strong>AbortController</strong>
                  <p>Отмена предыдущих запросов</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">🎛️</span>
                <div className="concept-text">
                  <strong>useRef Hook</strong>
                  <p>Управление внутренним состоянием</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="learning-info-panel">
          <div className="info-container">
            <h3>📚 Ключевые техники в этом примере:</h3>
            <div className="concepts-grid">
              <div className="concept-item">
                <span className="concept-icon">🪝</span>
                <div className="concept-text">
                  <strong>Custom Hook</strong>
                  <p>Инкапсуляция логики работы с API</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">�</span>
                <div className="concept-text">
                  <strong>Принудительное обновление</strong>
                  <p>Использование refreshKey для новых запросов</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">�</span>
                <div className="concept-text">
                  <strong>Отмена запросов</strong>
                  <p>AbortController для контроля запросов</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'technologies' && (
        <div className="learning-info-panel">
          <div className="info-container">
            <h3>📚 Полная интеграция API:</h3>
            <div className="concepts-grid">
              <div className="concept-item">
                <span className="concept-icon">➕</span>
                <div className="concept-text">
                  <strong>CRUD операции</strong>
                  <p>Create, Read, Update, Delete</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">💾</span>
                <div className="concept-text">
                  <strong>localStorage</strong>
                  <p>Сохранение данных в браузере</p>
                </div>
              </div>
              <div className="concept-item">
                <span className="concept-icon">🎨</span>
                <div className="concept-text">
                  <strong>UI управление</strong>
                  <p>Отображение и манипуляция данными</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="api-demo-final-footer">
        <h3>✅ Общий путь обучения:</h3>
        <div className="learning-path-cards">
          <div className="path-card">
            <div className="path-number">1️⃣</div>
            <div className="path-content">
              <h4>👥 Пользователи</h4>
              <p>Начните с базовых запросов к API</p>
            </div>
          </div>
          <div className="path-arrow">→</div>
          <div className="path-card">
            <div className="path-number">2️⃣</div>
            <div className="path-content">
              <h4>🛍️ Товары</h4>
              <p>Оптимизируйте запросы debounce</p>
            </div>
          </div>
          <div className="path-arrow">→</div>
          <div className="path-card">
            <div className="path-number">3️⃣</div>
            <div className="path-content">
              <h4>💬 Комментарии</h4>
              <p>Создавайте кастомные хуки</p>
            </div>
          </div>
          <div className="path-arrow">→</div>
          <div className="path-card">
            <div className="path-number">4️⃣</div>
            <div className="path-content">
              <h4>🚀 Дорожная карта</h4>
              <p>Интегрируйте всё вместе</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiDemo;

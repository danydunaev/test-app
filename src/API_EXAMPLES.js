// ==========================================
// ПРАКТИЧЕСКОЕ ЗАНЯТИЕ 24: РАБОТА С API В REACT
// ==========================================

// ==========================================
// 1. БАЗОВЫЙ ЗАПРОС К API (UserList.jsx)
// ==========================================

/**
 * Проблема: Нужно получить данные с внешнего API и отобразить их в компоненте,
 * обрабатывая состояния загрузки и ошибок.
 * 
 * Подход: Используем fetch для HTTP-запроса, useState для данных и useEffect
 * для выполнения запроса при монтировании компонента.
 */

import { useState, useEffect } from 'react';

function UserListExample() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // GET-запрос к API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // Проверка успешности
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      // Парсим JSON
      const userData = await response.json();
      setUsers(userData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h2>Пользователи ({users.length})</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 2. ПОИСК С DEBOUNCE (ProductSearch.jsx)
// ==========================================

/**
 * Проблема: Нужно реализовать поиск по API с задержкой и отменой запросов.
 * 
 * Подход: Используем setTimeout для debounce и AbortController для отмены.
 */

function ProductSearchExample() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const searchProducts = async (query) => {
    // Отменяем предыдущий запрос
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      // Запрос с сигналом отмены
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) throw new Error('Ошибка HTTP');

      const data = await response.json();
      setProducts(data.products || []);

    } catch (err) {
      // Игнорируем ошибки отмены
      if (err.name !== 'AbortError') {
        console.error('Ошибка:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Очистка предыдущего таймера
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Новый таймер с debounce (500ms)
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value);
    }, 500);
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {loading && <span>⌛ Загрузка...</span>}
      <p>Найдено: {products.length}</p>
    </div>
  );
}

// ==========================================
// 3. КАСТОМНЫЙ ХУК ДЛЯ API (useApi.js)
// ==========================================

/**
 * Проблема: Нужно переиспользуемую логику для работы с API.
 * 
 * Решение: Создаем кастомный хук, который инкапсулирует логику запросов.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Используем useCallback для стабильной функции
  const fetchData = useCallback(async (abortController) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        ...options,
        signal: abortController?.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      setData(result);

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Выполняем запрос при изменении URL
  useEffect(() => {
    const abortController = new AbortController();
    
    if (url) {
      fetchData(abortController);
    }

    return () => {
      abortController.abort();
    };
  }, [url, fetchData]);

  // Функция для повторного запроса
  const refetch = useCallback(() => {
    const abortController = new AbortController();
    fetchData(abortController);
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Использование:
function PostListExample() {
  const { data: posts, loading, error, refetch } = useApi(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading) return <p>Загрузка постов...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <button onClick={refetch}>Обновить</button>
      <h2>Посты ({posts?.length})</h2>
      <ul>
        {posts?.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 4. ХУК ДЛЯ РАБОТЫ С ТЕХНОЛОГИЯМИ
// ==========================================

/**
 * Специализированный хук для управления технологиями с CRUD операциями
 */

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка из localStorage или API
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      
      const saved = localStorage.getItem('technologies');
      if (saved) {
        setTechnologies(JSON.parse(saved));
        return;
      }

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockData = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для UI',
          category: 'frontend',
          resources: ['https://react.dev']
        }
      ];

      setTechnologies(mockData);
      localStorage.setItem('technologies', JSON.stringify(mockData));

    } catch (err) {
      setError('Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  // Добавление технологии
  const addTechnology = async (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      createdAt: new Date().toISOString()
    };

    const updated = [...technologies, newTech];
    setTechnologies(updated);
    localStorage.setItem('technologies', JSON.stringify(updated));
    return newTech;
  };

  // Удаление технологии
  const deleteTechnology = (id) => {
    const updated = technologies.filter(tech => tech.id !== id);
    setTechnologies(updated);
    localStorage.setItem('technologies', JSON.stringify(updated));
  };

  // Обновление технологии
  const updateTechnology = (id, updates) => {
    const updated = technologies.map(tech =>
      tech.id === id ? { ...tech, ...updates } : tech
    );
    setTechnologies(updated);
    localStorage.setItem('technologies', JSON.stringify(updated));
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    addTechnology,
    deleteTechnology,
    updateTechnology,
    refetch: fetchTechnologies
  };
}

// ==========================================
// 5. ПОИСК С DEBOUNCE (TechnologySearch.jsx)
// ==========================================

function TechnologySearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const searchTimeoutRef = useRef(null);

  const searchTechnologies = (query) => {
    // Фильтруем технологии по названию
    const filtered = technologies.filter(tech =>
      tech.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Очистка и установка debounce
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchTechnologies(value);
    }, 500);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск технологий..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {results.map(tech => (
          <li key={tech.id}>{tech.title}</li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 6. ИМПОРТ ДОРОЖНЫХ КАРТ (RoadmapImporter.jsx)
// ==========================================

function RoadmapImporterExample() {
  const { addTechnology } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);

  const roadmaps = {
    frontend: [
      { title: 'React', category: 'frontend' },
      { title: 'Vue.js', category: 'frontend' }
    ],
    backend: [
      { title: 'Node.js', category: 'backend' },
      { title: 'Express.js', category: 'backend' }
    ]
  };

  const handleImport = async (roadmapKey) => {
    try {
      setImporting(true);
      
      for (const tech of roadmaps[roadmapKey]) {
        await addTechnology(tech);
      }

      alert('✅ Импорт завершен!');

    } catch (err) {
      alert('❌ Ошибка импорта: ' + err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <button onClick={() => handleImport('frontend')} disabled={importing}>
        Импорт Frontend
      </button>
      <button onClick={() => handleImport('backend')} disabled={importing}>
        Импорт Backend
      </button>
    </div>
  );
}

// ==========================================
// КЛЮЧЕВЫЕ КОНЦЕПЦИИ
// ==========================================

/*
1. FETCH API
   - Стандартный способ получения данных в JavaScript
   - Возвращает Promise
   - Синтаксис: fetch(url, options).then(response => response.json())

2. USEEFFECT ДЛЯ ЗАПРОСОВ
   - Выполняет побочные эффекты (запросы к API)
   - Массив зависимостей контролирует, когда эффект выполняется
   - Функция очистки (return) выполняется при размонтировании

3. СОСТОЯНИЯ КОМПОНЕНТА
   - loading - идет ли загрузка данных
   - error - произошла ли ошибка
   - data - полученные данные

4. ABORT CONTROLLER
   - Позволяет отменить fetch запрос
   - Полезно для отмены предыдущих запросов при новом поиске
   - Использует сигнал: fetch(url, { signal: abortController.signal })

5. DEBOUNCE
   - Задержка выполнения функции
   - Уменьшает количество запросов при вводе текста
   - Используется setTimeout с clearTimeout

6. CUSTOM HOOKS
   - Переиспользуемая логика в виде функции
   - Инкапсулирует useState, useEffect и другие hooks
   - Начинаются с "use"

7. LOCALSTORAGE
   - Сохранение данных в браузере
   - Сохраняется даже после перезагрузки страницы
   - localStorage.setItem(key, value)
   - localStorage.getItem(key)

8. USECALLBACK
   - Мемоизация функции
   - Возвращает ту же функцию между рендерами, если зависимости не изменились
   - Оптимизирует производительность
*/

// ==========================================
// ПРОВЕРКА ЗНАНИЙ
// ==========================================

/*
✅ ТЕСТЫ ДЛЯ ПРОВЕРКИ:

1. Загрузка данных из API
   □ Компонент загружает данные при монтировании
   □ Показывает состояние загрузки (spinner)
   □ Обрабатывает ошибки корректно
   □ Отображает данные после загрузки

2. Обработка ошибок
   □ Ошибка отображается пользователю
   □ Кнопка "Попробовать снова" работает
   □ Запрос отменяется при размонтировании

3. Поиск с debounce
   □ Поиск работает с задержкой
   □ Предыдущие запросы отменяются
   □ Результаты обновляются правильно

4. Кастомные хуки
   □ Хук useApi работает с любым URL
   □ Хук useTechnologiesApi имеет CRUD операции
   □ Данные сохраняются в localStorage

5. Интеграция API
   □ Импорт дорожных карт добавляет технологии
   □ Поиск находит добавленные технологии
   □ Состояния загрузки/ошибок обрабатываются
*/

export { useApi, useTechnologiesApi };

import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка технологий из API или localStorage
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Проверяем localStorage на наличие сохраненных технологий
      const savedTechnologies = localStorage.getItem('technologies');
      if (savedTechnologies) {
        setTechnologies(JSON.parse(savedTechnologies));
        setLoading(false);
        return;
      }
      
      // Имитируем загрузку с задержкой
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock данные - в реальном приложении замените на реальный API
      const mockTechnologies = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://react.dev', 'https://ru.reactjs.org']
        },
        {
          id: 2,
          title: 'Node.js',
          description: 'Среда выполнения JavaScript на сервере',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/']
        },
        {
          id: 3,
          title: 'TypeScript',
          description: 'Типизированное надмножество JavaScript',
          category: 'language',
          difficulty: 'intermediate',
          resources: ['https://www.typescriptlang.org']
        }
      ];
      
      setTechnologies(mockTechnologies);
      // Сохраняем в localStorage
      localStorage.setItem('technologies', JSON.stringify(mockTechnologies));
      
    } catch (err) {
      setError('Не удалось загрузить технологии');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  // Добавление новой технологии
  const addTechnology = (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      createdAt: new Date().toISOString()
    };
    
    setTechnologies(prevTechs => {
      const updated = [...prevTechs, newTech];
      // Сохраняем в localStorage
      localStorage.setItem('technologies', JSON.stringify(updated));
      return updated;
    });
    
    return newTech;
  };

  // Удаление технологии
  const deleteTechnology = (id) => {
    setTechnologies(prevTechs => {
      const updated = prevTechs.filter(tech => tech.id !== id);
      // Сохраняем в localStorage
      localStorage.setItem('technologies', JSON.stringify(updated));
      return updated;
    });
  };

  // Обновление технологии
  const updateTechnology = (id, updates) => {
    setTechnologies(prevTechs => {
      const updated = prevTechs.map(tech =>
        tech.id === id ? { ...tech, ...updates } : tech
      );
      // Сохраняем в localStorage
      localStorage.setItem('technologies', JSON.stringify(updated));
      return updated;
    });
  };

  // Загружаем технологии при монтировании
  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    deleteTechnology,
    updateTechnology
  };
}

export default useTechnologiesApi;

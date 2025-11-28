import { useState, useEffect, useRef } from 'react';
import './TechnologySearch.css';

function TechnologySearch({ technologies = [], onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTechnologies, setFilteredTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Функция для поиска технологий с debounce
  const searchTechnologies = async (query) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      // Если поисковый запрос пустой, очищаем результаты
      if (!query.trim()) {
        setFilteredTechnologies([]);
        setShowResults(false);
        setLoading(false);
        return;
      }

      // Имитируем API запрос с задержкой
      await new Promise(resolve => setTimeout(resolve, 300));

      // Фильтруем технологии по названию и описанию
      const results = technologies.filter(tech => {
        const searchLower = query.toLowerCase();
        return (
          tech.title.toLowerCase().includes(searchLower) ||
          tech.description.toLowerCase().includes(searchLower) ||
          tech.category.toLowerCase().includes(searchLower)
        );
      });

      setFilteredTechnologies(results);
      setShowResults(true);

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка при поиске:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Очищаем предыдущий таймер
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Устанавливаем новый таймер для debounce (500ms)
    searchTimeoutRef.current = setTimeout(() => {
      searchTechnologies(value);
    }, 500);
  };

  // Обработчик выбора технологии
  const handleSelectTechnology = (tech) => {
    setSearchTerm('');
    setShowResults(false);
    if (onSelect) {
      onSelect(tech);
    }
  };

  // Очистка при размонтировании компонента
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
    <div className="technology-search">
      <div className="search-wrapper">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm.trim() && setShowResults(true)}
            className="search-input"
          />
          {loading && <span className="search-loading">⌛</span>}
        </div>

        {showResults && (
          <div className="search-results">
            {filteredTechnologies.length > 0 ? (
              <ul className="results-list">
                {filteredTechnologies.map(tech => (
                  <li
                    key={tech.id}
                    className="result-item"
                    onClick={() => handleSelectTechnology(tech)}
                  >
                    <div className="result-title">{tech.title}</div>
                    <div className="result-category">{tech.category}</div>
                    <div className="result-description">{tech.description}</div>
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm.trim() && !loading && (
                <div className="no-results">Технологии не найдены</div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologySearch;

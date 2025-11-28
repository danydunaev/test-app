import { useState, useEffect, useRef } from 'react';

// Кастомный хук для работы с API
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    const performFetch = async () => {
      try {
        // Отменяем предыдущий запрос если он есть
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Создаем новый AbortController
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal: abortControllerRef.current.signal,
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Проверяем что компонент ещё смонтирован
        if (isMountedRef.current) {
          setData(result);
        }

      } catch (err) {
        // Игнорируем ошибки отмены запроса
        if (err.name !== 'AbortError' && isMountedRef.current) {
          setError(err.message);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    // Выполняем запрос только если URL существует
    if (url) {
      performFetch();
    }

    // Функция очистки
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url]); // Зависим ТОЛЬКО от URL, чтобы избежать бесконечных циклов

  // Функция для повторного выполнения запроса
  const refetch = async () => {
    if (!isMountedRef.current || !url) return;

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (isMountedRef.current) {
        setData(result);
      }

    } catch (err) {
      if (err.name !== 'AbortError' && isMountedRef.current) {
        setError(err.message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return { data, loading, error, refetch };
}

export default useApi;

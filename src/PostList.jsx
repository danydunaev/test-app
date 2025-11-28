// PostsList.js - компонент для отображения интересных статей с хуком useApi
import { useState } from 'react';
import useApi from './hooks/useApi';
import './PostList.css';

function PostsList() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [offset, setOffset] = useState(0);
  
  // Генерируем разные посты используя разные offset значения
  // Это гарантирует, что при каждом обновлении будут разные данные
  const { data: posts, loading, error, refetch } = useApi(
    `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=10`
  );

  // Обработчик для кнопки обновления
  const handleRefresh = async () => {
    // Меняем offset для загрузки других постов
    // JSONPlaceholder имеет 100 постов, поэтому можем выбирать разные диапазоны
    const newOffset = Math.floor(Math.random() * 90); // 0-90 (чтобы было минимум 10 постов)
    setOffset(newOffset);
    setRefreshKey(prev => prev + 1);
    
    // Вызываем refetch для явной перезагрузки
    setTimeout(() => {
      refetch();
    }, 0);
  };

  if (loading) {
    return (
      <div className="post-list loading">
        <div className="spinner"></div>
        <p>Загрузка статей...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-list error">
        <h2>Ошибка при загрузке статей</h2>
        <p>{error}</p>
        <button onClick={refetch}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h2>� Интересные статьи ({posts?.length || 0})</h2>
        <button onClick={handleRefresh} className="refresh-button" disabled={loading}>
          {loading ? '⏳ Обновление...' : '🔄 Обновить'}
        </button>
      </div>

      <div className="posts-container">
        {posts?.map((post, index) => (
          <article key={post.id} className="post-card article-card">
            <div className="article-header">
              <div className="article-number">#{index + 1}</div>
              <h3 className="article-title">{post.title}</h3>
            </div>
            
            <div className="article-meta">
              <span className="meta-badge user-badge">👤 Автор #{post.userId}</span>
              <span className="meta-badge post-badge">📄 Статья #{post.id}</span>
            </div>

            <p className="article-body">{post.body}</p>
            
            <div className="article-footer">
              <button className="read-more-btn">
                Читать дальше →
              </button>
              <span className="article-length">
                📖 {Math.ceil(post.body.split(' ').length / 100)} мин. чтения
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default PostsList;

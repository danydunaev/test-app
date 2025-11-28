import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h1>Добро пожаловать на главную страницу!</h1>
      <p>Это стартовая страница приложения для отслеживания технологий.</p>
      <div className="features">
        <h2>Наши возможности:</h2>
        <ul>
          <li>Навигация между страницами</li>
          <li>Динамическая загрузка контента</li>
          <li>Быстрая работа без перезагрузки</li>
        </ul>
      </div>
      <div className="cta">
        <Link to="/technologies" className="btn btn-primary">Смотреть все технологии</Link>
        <Link to="/about" className="btn btn-secondary">Узнать больше</Link>
      </div>
    </div>
  );
}

export default Home;

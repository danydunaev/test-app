import { useNavigate } from 'react-router-dom';
import { getAllTechnologies, deleteTechnology } from '../utils/technologiesStorage';

function Settings() {
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все данные? Это действие необратимо!')) {
      const techs = getAllTechnologies();
      techs.forEach(tech => deleteTechnology(tech.id));
      navigate('/');
    }
  };

  const exportData = () => {
    const techs = getAllTechnologies();
    if (techs.length > 0) {
      const data = JSON.stringify(techs, null, 2);
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
      element.setAttribute('download', 'technologies.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      alert('Нет данных для экспорта');
    }
  };

  return (
    <div className="page">
      <h1>Настройки</h1>
      
      <div className="settings-section">
        <h3>Экспорт данных</h3>
        <p>Скачайте все ваши технологии в JSON формате</p>
        <button className="btn btn-primary" onClick={exportData}>
          Экспортировать данные
        </button>
      </div>

      <div className="settings-section">
        <h3>Опасная зона</h3>
        <p>Сбросить все данные приложения</p>
        <button className="btn btn-danger" onClick={handleReset}>
          Сбросить все технологии
        </button>
      </div>
    </div>
  );
}

export default Settings;

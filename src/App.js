import { useState, useEffect } from 'react';
import './App.css';
import Greeting from './Greeting';
import UserCard from './UseCard'; // Исправил возможный тайпо в импорте (было './UseCard', предполагаю, что файл UserCard.jsx)
import TaskList from './TaskList';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
// Новые примеры с useEffect
import WindowSizeTracker from './components/WindowSizeTracker';
import UserProfile from './components/UserProfile';
import ContactForm from './components/ContactForm';

function App() {
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' }
  ]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const updateStatus = (id, newStatus) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const markAllCompleted = () => {
    setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'completed' })));
  };

  const resetAll = () => {
    setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'not-started' })));
  };

  const randomNext = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length > 0) {
      const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
      updateStatus(randomTech.id, 'in-progress');
      alert(`Следующая технология: ${randomTech.title}`);
    } else {
      alert('Все технологии уже начаты или завершены!');
    }
  };

  // Загружаем данные из localStorage при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        setTechnologies(JSON.parse(saved));
        console.log('Данные загружены из localStorage');
      } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        // Убрал alert, чтобы не раздражать пользователя
      }
    }
  }, []);

  // Сохраняем технологии в localStorage с debounce (чтобы не спамить сохранениями при каждом изменении, напр. при вводе заметок)
  useEffect(() => {
    const debounceSave = setTimeout(() => {
      try {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        console.log('Данные сохранены в localStorage');
      } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
      }
    }, 500); // Задержка 0.5 секунды

    return () => clearTimeout(debounceSave);
  }, [technologies]);

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || tech.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="App">
      <Greeting />
      <UserCard
        name="Иван Иванов"
        role="Администратор"
        avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
        isOnline={true}
      />
      <TaskList />
      <ProgressHeader technologies={technologies} />
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onRandomNext={randomNext}
      />
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filteredTechnologies.length}</span>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('not-started')}>Не начатые</button>
        <button onClick={() => setFilter('in-progress')}>В процессе</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
      </div>
      <div className="technologies-list">
        {filteredTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            notes={tech.notes}
            onNotesChange={updateTechnologyNotes}
            id={tech.id}
            onStatusChange={(newStatus) => updateStatus(tech.id, newStatus)}
          />
        ))}
      </div>
      {/* Новые примеры с useEffect */}
      <WindowSizeTracker />
      <UserProfile />
      <ContactForm />
    </div>
  );
}

export default App;
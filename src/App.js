import { useState } from 'react';
import './App.css';
import Greeting from './Greeting';
import UserCard from './UseCard';
import TaskList from './TaskList';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
// Добавим новые примеры из теории
import Counter from './Counter';
import RegistrationForm from './RegistrationForm';
import ColorPicker from './ColorPicker';

function App() {
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'not-started', 'in-progress', 'completed'

  const updateStatus = (id, newStatus) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
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

  const filteredTechnologies = technologies.filter(tech => {
    if (filter === 'all') return true;
    return tech.status === filter;
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
      {/* Новые теоретические примеры */}
      <Counter />
      <RegistrationForm />
      <ColorPicker />
      <ProgressHeader technologies={technologies} />
      <QuickActions 
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onRandomNext={randomNext}
      />
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
            onStatusChange={(newStatus) => updateStatus(tech.id, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
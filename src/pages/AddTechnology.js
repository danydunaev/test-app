import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTechnology } from '../utils/technologiesStorage';

function AddTechnology() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Пожалуйста, введите название технологии');
      return;
    }

    const newTech = {
      title,
      description,
      notes,
      status: 'not-started'
    };

    addTechnology(newTech);
    navigate('/technologies');
  };

  return (
    <div className="page">
      <h1>Добавить новую технологию</h1>
      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label>Название технологии:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: React, Node.js, TypeScript"
            required
          />
        </div>

        <div className="form-group">
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание технологии"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Заметки:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ваши заметки о технологии"
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Добавить технологию
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/technologies')}
            className="btn btn-secondary"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;

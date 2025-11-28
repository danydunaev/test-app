import { useState } from 'react';
import '../styles/DataImporter.css';

function DataImporter({ onImport }) {
  const [importError, setImportError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [importSuccess, setImportSuccess] = useState('');

  // Валидация импортируемых данных
  const validateImportData = (data) => {
    if (!data.technologies || !Array.isArray(data.technologies)) {
      throw new Error('Неверный формат файла: отсутствует массив technologies');
    }

    data.technologies.forEach((tech, index) => {
      if (!tech.title || !tech.description) {
        throw new Error(`Технология #${index + 1}: отсутствует название или описание`);
      }

      if (tech.title.length > 50) {
        throw new Error(`Технология "${tech.title}": название слишком длинное (максимум 50 символов)`);
      }
    });

    return true;
  };

  // Обработка загруженного файла
  const handleFileUpload = (file) => {
    setImportError('');
    setImportSuccess('');
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const importedData = JSON.parse(fileContent);
        
        validateImportData(importedData);
        onImport(importedData.technologies);
        setImportSuccess(`✅ Успешно импортировано ${importedData.technologies.length} технологий`);
        setTimeout(() => setImportSuccess(''), 3000);
        
      } catch (error) {
        setImportError(`❌ Ошибка импорта: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setImportError('❌ Ошибка чтения файла');
    };

    reader.readAsText(file);
  };

  // Обработчик выбора файла
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileUpload(file);
      } else {
        setImportError('❌ Поддерживаются только JSON файлы');
      }
    }
  };

  // Обработчики drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileUpload(file);
      } else {
        setImportError('❌ Поддерживаются только JSON файлы');
      }
    }
  };

  return (
    <div className="data-importer">
      <h3>📤 Импорт дорожной карты</h3>

      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''} ${importError ? 'error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="Зона для перетягивания JSON файла"
      >
        <div className="drop-zone-content">
          <p className="drop-instruction">📁 Перетащите JSON файл сюда или</p>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            id="file-input"
            className="file-input"
            aria-label="Выберите JSON файл для импорта"
          />
          <label htmlFor="file-input" className="btn-secondary">
            📂 Выберите файл
          </label>
        </div>
      </div>

      {importError && (
        <div className="import-error" role="alert" aria-live="assertive">
          {importError}
        </div>
      )}

      {importSuccess && (
        <div className="import-success" role="status" aria-live="polite">
          {importSuccess}
        </div>
      )}

      <div className="import-help">
        <h4>📋 Требования к файлу:</h4>
        <ul>
          <li>✓ Формат: JSON</li>
          <li>✓ Обязательные поля: title, description</li>
          <li>✓ Максимальная длина названия: 50 символов</li>
          <li>✓ Структура: {`{ "technologies": [ { "title": "...", "description": "..." } ] }`}</li>
        </ul>
      </div>
    </div>
  );
}

export default DataImporter;

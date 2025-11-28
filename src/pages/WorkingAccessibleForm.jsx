import { useState, useRef, useEffect } from 'react';
import '../styles/WorkingAccessibleForm.css';

function WorkingAccessibleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  
  const statusRef = useRef(null);
  const nameRef = useRef(null);

  // Валидация при изменении полей
  useEffect(() => {
    const newErrors = {};
    
    if (name && name.length < 2) {
      newErrors.name = 'Имя должно быть не короче 2 символов';
    }
    
    if (email && !email.includes('@')) {
      newErrors.email = 'Email должен содержать @';
    }
    
    if (message && message.length < 5) {
      newErrors.message = 'Сообщение должно быть не короче 5 символов';
    }
    
    setErrors(newErrors);
  }, [name, email, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!name) newErrors.name = 'Введите имя';
    if (!email) newErrors.email = 'Введите email';
    if (!message) newErrors.message = 'Введите сообщение';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormStatus('Заполните все обязательные поля');
      if (statusRef.current) {
        statusRef.current.textContent = 'Ошибка: заполните все обязательные поля';
      }
      // Фокусируемся на первом поле с ошибкой
      if (nameRef.current) {
        nameRef.current.focus();
      }
      return;
    }
    
    // Если есть другие ошибки валидации
    if (Object.keys(errors).length > 0) {
      setFormStatus('Исправьте ошибки в форме');
      if (statusRef.current) {
        statusRef.current.textContent = 'Ошибка: исправьте ошибки в форме';
      }
      return;
    }
    
    // Успешная отправка
    setFormStatus('✅ Форма успешно отправлена!');
    if (statusRef.current) {
      statusRef.current.textContent = 'Форма успешно отправлена!';
    }
    console.log('Отправлены данные:', { name, email, message });
    
    // Очистка формы
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setFormStatus('');
    }, 2000);
  };

  return (
    <div className="accessible-form-container">
      <div className="accessible-form-wrapper">
        <h1>Контактная форма</h1>
        <p className="form-description">Заполните форму и отправьте нам ваше сообщение</p>
        
        {/* Область для скринридера */}
        <div
          ref={statusRef}
          aria-live="assertive"
          aria-atomic="true"
          className="sr-only"
        />
        
        <form onSubmit={handleSubmit} noValidate className="accessible-form">
          {/* Поле имени */}
          <div className="form-group">
            <label htmlFor="name" className="form-label required">
              Ваше имя
            </label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Иван Петров"
            />
            {errors.name && (
              <div id="name-error" className="error-message" role="alert">
                ❌ {errors.name}
              </div>
            )}
            <div className="help-text">Минимум 2 символа</div>
          </div>

          {/* Поле email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label required">
              Email адрес
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="your@example.com"
            />
            {errors.email && (
              <div id="email-error" className="error-message" role="alert">
                ❌ {errors.email}
              </div>
            )}
            <div className="help-text">Должен содержать символ @</div>
          </div>

          {/* Поле сообщения */}
          <div className="form-group">
            <label htmlFor="message" className="form-label required">
              Ваше сообщение
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className={`form-textarea ${errors.message ? 'input-error' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Напишите ваше сообщение здесь..."
            />
            {errors.message && (
              <div id="message-error" className="error-message" role="alert">
                ❌ {errors.message}
              </div>
            )}
            <div className="help-text">Минимум 5 символов</div>
          </div>

          {/* Статус формы */}
          {formStatus && (
            <div 
              className={`form-status ${formStatus.includes('успешно') ? 'status-success' : 'status-error'}`}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {formStatus}
            </div>
          )}

          <button
            type="submit"
            className="btn-submit"
            aria-label="Отправить форму"
          >
            📤 Отправить сообщение
          </button>
        </form>

        {/* Информация о доступности */}
        <div className="accessibility-info">
          <h2>♿ Информация о доступности</h2>
          <ul>
            <li>Все поля формы имеют метки (labels) для скринридеров</li>
            <li>Ошибки валидации доступны через role="alert"</li>
            <li>Фокус автоматически переходит на первое поле с ошибкой</li>
            <li>Все обязательные поля помечены звёздочкой (*)</li>
            <li>Используются ARIA-атрибуты для лучшей поддержки скринридеров</li>
            <li>Есть вспомогательный текст (help-text) для каждого поля</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkingAccessibleForm;

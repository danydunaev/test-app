import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert
} from '@mui/material';
import { useState, useEffect } from 'react';

function MuiTechnologyModal({ 
  open, 
  onClose, 
  technology, 
  onSave 
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    difficulty: 'beginner',
    deadline: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (technology) {
      setFormData({
        title: technology.title || '',
        description: technology.description || '',
        category: technology.category || 'frontend',
        difficulty: technology.difficulty || 'beginner',
        deadline: technology.deadline || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'frontend',
        difficulty: 'beginner',
        deadline: ''
      });
    }
    setErrors({});
  }, [open, technology]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Название должно быть минимум 2 символа';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Название не должно превышать 50 символов';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно быть минимум 10 символов';
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {technology ? 'Редактировать технологию' : 'Добавить новую технологию'}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Пожалуйста, исправьте ошибки в форме
          </Alert>
        )}

        <TextField
          fullWidth
          label="Название технологии"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          placeholder="React, Node.js, TypeScript..."
          margin="normal"
          required
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Описание"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          placeholder="Опишите технологию..."
          margin="normal"
          multiline
          rows={4}
          required
          variant="outlined"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Категория</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Категория"
          >
            <MenuItem value="frontend">🎨 Frontend</MenuItem>
            <MenuItem value="backend">⚙️ Backend</MenuItem>
            <MenuItem value="mobile">📱 Mobile</MenuItem>
            <MenuItem value="devops">🚀 DevOps</MenuItem>
            <MenuItem value="database">🗄️ Database</MenuItem>
            <MenuItem value="tools">🛠️ Tools</MenuItem>
            <MenuItem value="ui-library">🎭 UI Kit</MenuItem>
            <MenuItem value="other">📚 Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Уровень сложности</InputLabel>
          <Select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            label="Уровень сложности"
          >
            <MenuItem value="beginner">Начинающий</MenuItem>
            <MenuItem value="intermediate">Средний</MenuItem>
            <MenuItem value="advanced">Продвинутый</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Планируемая дата освоения"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          error={!!errors.deadline}
          helperText={errors.deadline}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Отмена
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
        >
          {technology ? 'Обновить' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MuiTechnologyModal;

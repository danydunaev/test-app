import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  LinearProgress
} from '@mui/material';

function SimpleTechCard({ technology, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '✅ Завершено';
      case 'in-progress': return '🔄 В процессе';
      default: return '⏳ Не начато';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'frontend': 'primary',
      'backend': 'secondary',
      'mobile': 'info',
      'devops': 'warning',
      'database': 'error',
      'tools': 'success',
      'ui-library': 'primary',
      'other': 'default'
    };
    return colors[category] || 'default';
  };

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {technology.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
          {technology.description}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip 
            label={technology.category} 
            variant="outlined" 
            size="small"
            color={getCategoryColor(technology.category)}
          />
          <Chip 
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
            variant="filled"
          />
        </Box>

        {technology.deadline && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Дедлайн: {new Date(technology.deadline).toLocaleDateString('ru-RU')}
            </Typography>
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ pt: 0 }}>
        {technology.status !== 'completed' && (
          <Button 
            size="small" 
            variant="contained"
            color="success"
            onClick={() => onStatusChange(technology.id, 'completed')}
          >
            Завершить
          </Button>
        )}
        
        <Button 
          size="small" 
          variant="outlined"
          onClick={() => onStatusChange(technology.id, 
            technology.status === 'in-progress' ? 'not-started' : 'in-progress')}
        >
          {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SimpleTechCard;

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

function MuiTechnologyCard({ 
  technology, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(technology);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить "${technology.title}"?`)) {
      onDelete(technology.id);
    }
    handleMenuClose();
  };

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

  const getCategoryLabel = (category) => {
    const labels = {
      'frontend': '🎨 Frontend',
      'backend': '⚙️ Backend',
      'mobile': '📱 Mobile',
      'devops': '🚀 DevOps',
      'database': '🗄️ Database',
      'tools': '🛠️ Tools',
      'ui-library': '🎭 UI Kit',
      'other': '📚 Other'
    };
    return labels[category] || category;
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, flex: 1 }}>
            {technology.title}
          </Typography>
          <IconButton
            aria-label="options"
            onClick={handleMenuOpen}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} fontSize="small" />
            Редактировать
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
            Удалить
          </MenuItem>
        </Menu>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {technology.description}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip 
            label={getCategoryLabel(technology.category)}
            size="small"
            variant="outlined"
          />
          <Chip 
            label={getStatusText(technology.status)}
            size="small"
            color={getStatusColor(technology.status)}
            variant="filled"
          />
        </Box>

        {technology.difficulty && (
          <Typography variant="caption" display="block" color="text.secondary" mb={1}>
            📊 Сложность: {
              technology.difficulty === 'beginner' ? 'Начинающий' :
              technology.difficulty === 'intermediate' ? 'Средний' :
              'Продвинутый'
            }
          </Typography>
        )}

        {technology.deadline && (
          <Typography variant="caption" display="block" color="text.secondary">
            📅 Дедлайн: {new Date(technology.deadline).toLocaleDateString('ru-RU')}
          </Typography>
        )}
      </CardContent>
      
      <CardActions>
        <Button 
          size="small"
          onClick={() => onStatusChange(technology.id, 
            technology.status === 'in-progress' ? 'not-started' : 'in-progress')}
        >
          {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
        </Button>
        
        {technology.status !== 'completed' && (
          <Button 
            size="small"
            color="success"
            onClick={() => onStatusChange(technology.id, 'completed')}
          >
            Завершить
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default MuiTechnologyCard;

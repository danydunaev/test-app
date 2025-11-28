import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider,
  CssBaseline, 
  Box, 
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../styles/theme';
import SimpleTechCard from '../components/SimpleTechCard';
import MuiTechnologyCard from '../components/MuiTechnologyCard';
import MuiDashboard from '../components/MuiDashboard';
import MuiTechnologyModal from '../components/MuiTechnologyModal';
import ThemeSwitcher from '../components/ThemeSwitcher';
import MuiNotifications from '../components/MuiNotifications';
import { getAllTechnologies } from '../utils/technologiesStorage';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`app-tabpanel-${index}`}
      aria-labelledby={`app-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function MuiApp() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme-mode') === 'dark';
  });

  const [tabValue, setTabValue] = useState(0);
  const [technologies, setTechnologies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Сохранение предпочтения темы
  useEffect(() => {
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Загрузка технологий из centralized storage
  useEffect(() => {
    setTechnologies(getAllTechnologies());
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    showNotification(
      isDarkMode ? '☀️ Переключено на светлую тему' : '🌙 Переключено на тёмную тему',
      'info'
    );
  };

  const handleAddTechnology = (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      status: 'not-started',
      createdAt: new Date().toISOString()
    };
    setTechnologies(prev => [...prev, newTech]);
    showNotification('✅ Технология успешно добавлена', 'success');
  };

  const handleEditTechnology = (techData) => {
    setTechnologies(prev => 
      prev.map(tech => tech.id === editingTech.id ? { ...tech, ...techData } : tech)
    );
    setEditingTech(null);
    showNotification('✏️ Технология успешно обновлена', 'success');
  };

  const handleSaveTechnology = (techData) => {
    if (editingTech) {
      handleEditTechnology(techData);
    } else {
      handleAddTechnology(techData);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (technology) => {
    setEditingTech(technology);
    setIsModalOpen(true);
  };

  const handleDelete = (techId) => {
    const tech = technologies.find(t => t.id === techId);
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
    showNotification(`🗑️ Технология "${tech?.title}" удалена`, 'warning');
  };

  const handleStatusChange = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => tech.id === techId ? { ...tech, status: newStatus } : tech)
    );
    
    const statusTexts = {
      'completed': '✅ завершена',
      'in-progress': '🔄 начата',
      'not-started': '⏳ приостановлена'
    };
    showNotification(
      `Технология ${statusTexts[newStatus]}`,
      newStatus === 'completed' ? 'success' : 'info'
    );
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh', 
        backgroundColor: 'background.default'
      }}>
        {/* Шапка приложения */}
        <AppBar position="sticky" elevation={2}>
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1, fontWeight: 700 }}
            >
              🚀 MUI Трекер Технологий
            </Typography>
            
            <ThemeSwitcher 
              isDarkMode={isDarkMode} 
              onToggleTheme={handleToggleTheme}
            />
            
            <Button 
              color="inherit" 
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingTech(null);
                setIsModalOpen(true);
              }}
              sx={{ ml: 2 }}
            >
              Добавить
            </Button>
          </Toolbar>
        </AppBar>

        {/* Навигация табами */}
        <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="app tabs"
            sx={{ px: 2 }}
          >
            <Tab label="📋 Простой вид" />
            <Tab label="🎨 Расширенный вид" />
            <Tab label="📊 Дашборд" />
          </Tabs>
        </Paper>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Вкладка простого вида */}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Мои технологии (Простой вид)
            </Typography>
            
            <Grid container spacing={3}>
              {technologies.map(technology => (
                <Grid item xs={12} sm={6} md={4} key={technology.id}>
                  <SimpleTechCard
                    technology={technology}
                    onStatusChange={handleStatusChange}
                  />
                </Grid>
              ))}
            </Grid>

            {technologies.length === 0 && (
              <Box 
                textAlign="center" 
                py={8} 
                color="text.secondary"
              >
                <Typography variant="h6" gutterBottom>
                  📚 Технологий пока нет
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Добавьте первую технологию для отслеживания прогресса
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => setIsModalOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Добавить технологию
                </Button>
              </Box>
            )}
          </TabPanel>

          {/* Вкладка расширенного вида */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Мои технологии (Расширенный вид)
            </Typography>
            
            <Grid container spacing={3}>
              {technologies.map(technology => (
                <Grid item xs={12} sm={6} md={4} key={technology.id}>
                  <MuiTechnologyCard
                    technology={technology}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                </Grid>
              ))}
            </Grid>

            {technologies.length === 0 && (
              <Box 
                textAlign="center" 
                py={8} 
                color="text.secondary"
              >
                <Typography variant="h6" gutterBottom>
                  📚 Технологий пока нет
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Добавьте первую технологию для отслеживания прогресса
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => setIsModalOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Добавить технологию
                </Button>
              </Box>
            )}
          </TabPanel>

          {/* Вкладка дашборда */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Панель управления
            </Typography>
            <MuiDashboard technologies={technologies} />
          </TabPanel>
        </Container>

        {/* Модальное окно */}
        <MuiTechnologyModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTech(null);
          }}
          technology={editingTech}
          onSave={handleSaveTechnology}
        />

        {/* Уведомления */}
        <MuiNotifications
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
          autoHideDuration={4000}
          position={{ vertical: 'bottom', horizontal: 'left' }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default MuiApp;

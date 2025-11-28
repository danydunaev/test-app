import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function MuiDashboard({ technologies }) {
  const [tabValue, setTabValue] = React.useState(0);

  // Статистика
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    progress: technologies.length > 0 ? 
      Math.round((technologies.filter(t => t.status === 'completed').length / technologies.length) * 100) : 0
  };

  // Активные технологии
  const activeTechnologies = technologies
    .filter(t => t.status === 'in-progress')
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  // Недавно добавленные
  const recentTechnologies = technologies
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      {/* Табы */}
      <Paper sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="dashboard tabs"
        >
          <Tab label="📊 Обзор" />
          <Tab label="📈 Статистика" />
          <Tab label="📋 Активность" />
        </Tabs>
      </Paper>

      {/* Вкладка обзора */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Статистические карточки */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="caption">
                  Всего технологий
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="caption">
                  Завершено
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', my: 1 }}>
                  {stats.completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="caption">
                  В процессе
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', my: 1 }}>
                  {stats.inProgress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="caption">
                  Не начато
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.secondary', my: 1 }}>
                  {stats.notStarted}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Прогресс */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  🎯 Общий прогресс
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box flex={1}>
                    <LinearProgress 
                      variant="determinate" 
                      value={stats.progress} 
                      sx={{ height: 12, borderRadius: 6 }}
                      color="success"
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, minWidth: 60 }}>
                    {stats.progress}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Активные технологии */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  ⏰ Активные технологии
                </Typography>
                <List sx={{ pt: 0 }}>
                  {activeTechnologies.length > 0 ? (
                    activeTechnologies.map((tech, index) => (
                      <React.Fragment key={tech.id}>
                        <ListItem>
                          <ListItemIcon>
                            <ScheduleIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText
                            primary={tech.title}
                            secondary={tech.category}
                          />
                          <Chip 
                            label="В процессе"
                            size="small"
                            color="warning"
                          />
                        </ListItem>
                        {index < activeTechnologies.length - 1 && <Divider />}
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText 
                        primary="Нет активных технологий"
                        secondary="Начните изучение новой технологии"
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Недавно добавленные */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  🆕 Недавно добавленные
                </Typography>
                <List sx={{ pt: 0 }}>
                  {recentTechnologies.length > 0 ? (
                    recentTechnologies.map((tech, index) => (
                      <React.Fragment key={tech.id}>
                        <ListItem>
                          <ListItemIcon>
                            {tech.status === 'completed' ? (
                              <CheckCircleIcon color="success" />
                            ) : tech.status === 'in-progress' ? (
                              <ScheduleIcon color="warning" />
                            ) : (
                              <RadioButtonUncheckedIcon color="disabled" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={tech.title}
                            secondary={tech.category}
                          />
                          <Chip 
                            label={tech.status === 'completed' ? '✅' : 
                                  tech.status === 'in-progress' ? '🔄' : '⏳'}
                            size="small"
                            variant="outlined"
                          />
                        </ListItem>
                        {index < recentTechnologies.length - 1 && <Divider />}
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText 
                        primary="Технологий нет"
                        secondary="Добавьте первую технологию"
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка статистики */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  📊 Распределение по статусам
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ✅ Завершено ({stats.completed})
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                      {stats.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={stats.progress} 
                    color="success"
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                  
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      🔄 В процессе ({stats.inProgress})
                    </Typography>
                    <Typography variant="body2" color="warning.main" sx={{ fontWeight: 600 }}>
                      {Math.round((stats.inProgress / stats.total) * 100) || 0}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.inProgress / stats.total) * 100} 
                    color="warning"
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                  
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ⏳ Не начато ({stats.notStarted})
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {Math.round((stats.notStarted / stats.total) * 100) || 0}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.notStarted / stats.total) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  🎯 Сводка
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Всего технологий:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {stats.total}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Завершено:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {stats.completed}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Осталось:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      {stats.total - stats.completed}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка активности */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              📋 История активности
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Здесь будет отображаться история изменений статусов, добавлений и удалений технологий...
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
}

export default MuiDashboard;

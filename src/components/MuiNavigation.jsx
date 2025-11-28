import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import ThemeSwitcher from './ThemeSwitcher';

function MuiNavigation({ isLoggedIn, username, onLogout, isDarkMode, onToggleTheme }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = React.useState(null);

  const navigationItems = [
    { label: 'Главная', path: '/' },
    { label: 'О проекте', path: '/about' },
    { label: 'Технологии', path: '/technologies' },
    { label: 'Добавить', path: '/add-technology' },
    { label: 'Статистика', path: '/statistics' },
    { label: 'API', path: '/api-demo' },
    { label: 'Управление', path: '/tech-manager' },
    { label: 'Доступность', path: '/accessibility' },
    { label: 'Импорт/Экспорт', path: '/import-export' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    onLogout();
  };

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Меню
        </Typography>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ py: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={handleDrawerToggle}
              sx={{
                my: 0.5,
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {!isLoggedIn && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ px: 2 }}>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              fullWidth
              onClick={handleDrawerToggle}
            >
              Войти
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ maxWidth: '100%', px: { xs: 1, md: 3 } }}>
        {/* Логотип */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          🚀 Трекер
        </Typography>

        {/* Desktop навигация - компактная */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mr: 3 }}>
            {navigationItems.slice(0, 5).map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                color="inherit"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1,
                  transition: 'all 0.2s',
                  backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            {navigationItems.length > 5 && (
              <>
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleMoreMenuOpen}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    px: 1.5,
                  }}
                >
                  Ещё...
                </Button>
                <Menu
                  anchorEl={moreMenuAnchor}
                  open={Boolean(moreMenuAnchor)}
                  onClose={handleMoreMenuClose}
                >
                  {navigationItems.slice(5).map((item) => (
                    <MenuItem
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      onClick={handleMoreMenuClose}
                      selected={location.pathname === item.path}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        )}

        {/* Переключатель темы */}
        <ThemeSwitcher isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

        {/* User меню для desktop */}
        {!isMobile && isLoggedIn && (
          <Box sx={{ ml: 2 }}>
            <Button
              onClick={handleUserMenuOpen}
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '0.9rem' }}
            >
              {username}
            </Button>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
            >
              <MenuItem component={RouterLink} to="/dashboard" onClick={handleUserMenuClose}>
                Панель управления
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </Box>
        )}

        {/* Кнопка логина для desktop */}
        {!isMobile && !isLoggedIn && (
          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            size="small"
            sx={{ textTransform: 'none', ml: 1 }}
          >
            Войти
          </Button>
        )}

        {/* Мобильное меню */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default MuiNavigation;

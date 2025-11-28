import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

/**
 * Компонент переключения темы (светлая/тёмная)
 * Задание 2: Добавьте переключение темы (светлая/тёмная)
 */
function ThemeSwitcher({ isDarkMode, onToggleTheme }) {
  return (
    <Tooltip title={isDarkMode ? 'Светлая тема' : 'Тёмная тема'}>
      <IconButton 
        onClick={onToggleTheme}
        color="inherit"
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'rotate(20deg)',
          }
        }}
      >
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;

import React from 'react';
import { Snackbar, Alert, Box } from '@mui/material';

/**
 * Компонент уведомлений с использованием Snackbar из MUI
 * Задание 1: Компонент уведомлений с использованием Snackbar
 */
function MuiNotifications({ 
  open = false, 
  message = '', 
  severity = 'info', 
  autoHideDuration = 4000,
  onClose = () => {},
  position = { vertical: 'bottom', horizontal: 'left' }
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={position}
      sx={{ 
        '& .MuiSnackbar-root': {
          zIndex: 1400,
        }
      }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        sx={{ 
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px',
          fontWeight: 500
        }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

/**
 * Контейнер для управления несколькими уведомлениями
 */
export function NotificationsContainer({ notifications = [] }) {
  return (
    <Box>
      {notifications.map((notification, index) => (
        <Snackbar
          key={index}
          open={notification.open}
          autoHideDuration={notification.autoHideDuration || 4000}
          onClose={notification.onClose}
          anchorOrigin={notification.position || { vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={notification.onClose} 
            severity={notification.severity || 'info'}
            variant="filled"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}

export default MuiNotifications;

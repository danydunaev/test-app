import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';
import MuiNavigation from './components/MuiNavigation';
import Home from './pages/Home';
import About from './pages/About';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApiDemo from './pages/ApiDemo';
import WorkingAccessibleForm from './pages/WorkingAccessibleForm';
import DataImportExport from './pages/DataImportExport';
import MuiApp from './pages/MuiApp';
import TechnologyManager from './components/TechnologyManager';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme-mode') === 'dark';
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(user);
    
    // Инициализируем data-theme при загрузке
    const isDark = localStorage.getItem('theme-mode') === 'dark';
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.setAttribute('data-theme', 'dark');
      htmlElement.style.colorScheme = 'dark';
    } else {
      htmlElement.setAttribute('data-theme', 'light');
      htmlElement.style.colorScheme = 'light';
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
    // Устанавливаем data-theme атрибут на html для CSS переменных
    const htmlElement = document.documentElement;
    
    if (isDarkMode) {
      htmlElement.setAttribute('data-theme', 'dark');
      htmlElement.style.colorScheme = 'dark';
    } else {
      htmlElement.setAttribute('data-theme', 'light');
      htmlElement.style.colorScheme = 'light';
    }
  }, [isDarkMode]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}>
          <MuiNavigation 
            isLoggedIn={isLoggedIn} 
            username={username} 
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />

          <Box component="main" sx={{ flex: 1, backgroundColor: 'background.default' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/technologies" element={<TechnologyList />} />
              <Route path="/technology/:techId" element={<TechnologyDetail />} />
              <Route path="/add-technology" element={<AddTechnology />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/api-demo" element={<ApiDemo />} />
              <Route path="/tech-manager" element={<TechnologyManager />} />
              <Route path="/accessibility" element={<WorkingAccessibleForm />} />
              <Route path="/import-export" element={<DataImportExport />} />
              <Route path="/mui-app" element={<MuiApp />} />
              <Route 
                path="/login" 
                element={<Login onLogin={handleLogin} />} 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard username={username} />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
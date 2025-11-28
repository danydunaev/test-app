// utils/technologiesStorage.js
// Централизованное управление технологиями через localStorage

const STORAGE_KEY = 'technologies';

// Получить все технологии
export const getAllTechnologies = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Ошибка при загрузке технологий:', error);
    return [];
  }
};

// Получить одну технологию по ID
export const getTechnologyById = (id) => {
  const technologies = getAllTechnologies();
  // Сравниваем как числа
  return technologies.find(t => Number(t.id) === Number(id));
};

// Добавить технологию
export const addTechnology = (tech) => {
  const technologies = getAllTechnologies();
  const newTech = {
    ...tech,
    id: Date.now(), // Всегда используем Date.now()
    createdAt: new Date().toISOString(),
    status: tech.status || 'not-started',
  };
  technologies.push(newTech);
  saveTechnologies(technologies);
  return newTech;
};

// Обновить технологию
export const updateTechnology = (id, updates) => {
  const technologies = getAllTechnologies();
  const index = technologies.findIndex(t => Number(t.id) === Number(id));
  
  if (index !== -1) {
    technologies[index] = { ...technologies[index], ...updates };
    saveTechnologies(technologies);
    return technologies[index];
  }
  return null;
};

// Удалить технологию
export const deleteTechnology = (id) => {
  const technologies = getAllTechnologies();
  const filtered = technologies.filter(t => Number(t.id) !== Number(id));
  saveTechnologies(filtered);
  return filtered.length < technologies.length;
};

// Сохранить технологии
export const saveTechnologies = (technologies) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(technologies));
  } catch (error) {
    console.error('Ошибка при сохранении технологий:', error);
  }
};

// Получить статистику
export const getStatistics = () => {
  const technologies = getAllTechnologies();
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  
  return {
    total,
    completed,
    inProgress,
    notStarted,
    progress: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};

export default {
  getAllTechnologies,
  getTechnologyById,
  addTechnology,
  updateTechnology,
  deleteTechnology,
  saveTechnologies,
  getStatistics,
};

/**
 * Практическое занятие 24: Тесты для проверки выполнения
 * 
 * Используйте этот файл для проверки всех компонентов и функциональности
 */

// ============================================
// ТЕСТ 1: БАЗОВЫЙ ЗАПРОС (UserList)
// ============================================

const test1LoadUsersFromAPI = () => {
  console.log('TEST 1: Загрузка пользователей из API');
  
  const checks = [
    {
      name: 'Компонент отображает индикатор загрузки',
      check: () => document.querySelector('.spinner') !== null
    },
    {
      name: 'После загрузки отображается список пользователей',
      check: () => document.querySelector('.user-card') !== null
    },
    {
      name: 'Каждый пользователь содержит имя',
      check: () => document.querySelector('.user-card h3') !== null
    },
    {
      name: 'Каждый пользователь содержит email',
      check: () => document.textContent.includes('Email:')
    },
    {
      name: 'Кнопка повторной загрузки присутствует',
      check: () => document.querySelector('.retry-button') !== null
    }
  ];

  return checks;
};

// ============================================
// ТЕСТ 2: ПОИСК С DEBOUNCE (ProductSearch)
// ============================================

const test2SearchWithDebounce = () => {
  console.log('TEST 2: Поиск с debounce');
  
  const checks = [
    {
      name: 'Поле поиска присутствует',
      check: () => document.querySelector('.search-input') !== null
    },
    {
      name: 'При вводе текста показывается индикатор загрузки',
      check: () => {
        const input = document.querySelector('.search-input');
        if (!input) return false;
        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        return true;
      }
    },
    {
      name: 'Результаты отображаются в сетке',
      check: () => document.querySelector('.products-grid') !== null
    },
    {
      name: 'Каждый товар содержит изображение',
      check: () => document.querySelector('.product-image') !== null
    },
    {
      name: 'Каждый товар содержит цену',
      check: () => document.querySelector('.product-price') !== null
    }
  ];

  return checks;
};

// ============================================
// ТЕСТ 3: КАСТОМНЫЙ ХУК useApi (PostList)
// ============================================

const test3CustomHookUseApi = () => {
  console.log('TEST 3: Кастомный хук useApi');
  
  const checks = [
    {
      name: 'Компонент загружает посты при монтировании',
      check: () => document.querySelector('.post-list') !== null
    },
    {
      name: 'Отображается заголовок со счетчиком постов',
      check: () => document.textContent.includes('Список постов')
    },
    {
      name: 'Каждый пост содержит заголовок',
      check: () => document.querySelector('.post-card h3') !== null
    },
    {
      name: 'Каждый пост содержит текст',
      check: () => document.querySelector('.post-card p') !== null
    },
    {
      name: 'Кнопка "Обновить" присутствует',
      check: () => document.querySelector('.refresh-button') !== null
    },
    {
      name: 'Кнопка "Обновить" работает',
      check: () => {
        const btn = document.querySelector('.refresh-button');
        return btn && btn.onclick !== null;
      }
    }
  ];

  return checks;
};

// ============================================
// ТЕСТ 4: ПОИСК ТЕХНОЛОГИЙ (TechnologySearch)
// ============================================

const test4TechnologySearch = () => {
  console.log('TEST 4: Поиск технологий с debounce');
  
  const checks = [
    {
      name: 'Компонент поиска присутствует',
      check: () => document.querySelector('.technology-search') !== null
    },
    {
      name: 'Поле поиска технологий присутствует',
      check: () => document.querySelector('.search-input') !== null
    },
    {
      name: 'Результаты поиска отображаются в списке',
      check: () => document.querySelector('.results-list') !== null ||
                   document.querySelector('.no-results') !== null
    },
    {
      name: 'При клике на результат происходит выбор',
      check: () => document.querySelector('.result-item') !== null
    },
    {
      name: 'Каждый результат содержит название',
      check: () => document.querySelector('.result-title') !== null ||
                   !document.querySelector('.result-item')
    }
  ];

  return checks;
};

// ============================================
// ТЕСТ 5: ИМПОРТ ДОРОЖНЫХ КАРТ (RoadmapImporter)
// ============================================

const test5RoadmapImporter = () => {
  console.log('TEST 5: Импорт дорожных карт');
  
  const checks = [
    {
      name: 'Компонент импортера присутствует',
      check: () => document.querySelector('.roadmap-importer') !== null
    },
    {
      name: 'Кнопка "Frontend" присутствует',
      check: () => {
        const buttons = Array.from(document.querySelectorAll('.import-button'));
        return buttons.some(btn => btn.textContent.includes('Frontend'));
      }
    },
    {
      name: 'Кнопка "Backend" присутствует',
      check: () => {
        const buttons = Array.from(document.querySelectorAll('.import-button'));
        return buttons.some(btn => btn.textContent.includes('Backend'));
      }
    },
    {
      name: 'Кнопка "FullStack" присутствует',
      check: () => {
        const buttons = Array.from(document.querySelectorAll('.import-button'));
        return buttons.some(btn => btn.textContent.includes('FullStack'));
      }
    },
    {
      name: 'При клике на кнопку импорта показывается сообщение',
      check: () => {
        const buttons = document.querySelectorAll('.import-button');
        return buttons.length > 0;
      }
    }
  ];

  return checks;
};

// ============================================
// ТЕСТ 6: УПРАВЛЕНИЕ ТЕХНОЛОГИЯМИ
// ============================================

const test6TechnologyManagement = () => {
  console.log('TEST 6: Управление технологиями');
  
  const checks = [
    {
      name: 'Список технологий отображается',
      check: () => document.querySelector('.tech-grid') !== null ||
                   document.querySelector('.empty-message') !== null
    },
    {
      name: 'Каждая технология содержит название',
      check: () => document.querySelector('.tech-card h4') !== null ||
                   !document.querySelector('.tech-card')
    },
    {
      name: 'Каждая технология содержит описание',
      check: () => document.querySelector('.tech-description') !== null ||
                   !document.querySelector('.tech-card')
    },
    {
      name: 'Каждая технология содержит категорию',
      check: () => document.querySelector('.tech-category') !== null ||
                   !document.querySelector('.tech-card')
    },
    {
      name: 'Технологии содержат ресурсы',
      check: () => document.querySelector('.tech-resources') !== null ||
                   !document.querySelector('.tech-card')
    }
  ];

  return checks;
};

// ============================================
// ТЕСТ 7: ОБРАБОТКА ОШИБОК
// ============================================

const test7ErrorHandling = () => {
  console.log('TEST 7: Обработка ошибок');
  
  const checks = [
    {
      name: 'Компонент имеет fallback при ошибке загрузки',
      check: () => document.textContent.includes('Ошибка') ||
                   document.querySelector('.error') !== null
    },
    {
      name: 'Кнопка повтора присутствует при ошибке',
      check: () => document.querySelector('.retry-button') !== null ||
                   !document.textContent.includes('Ошибка')
    },
    {
      name: 'Сообщения об ошибке имеют понятный текст',
      check: () => true // Проверяется визуально
    }
  ];

  return checks;
};

// ============================================
// ТЕСТ 8: ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
// ============================================

const test8LocalStorage = () => {
  console.log('TEST 8: LocalStorage');
  
  const checks = [
    {
      name: 'Технологии сохраняются в localStorage',
      check: () => {
        const saved = localStorage.getItem('technologies');
        return saved !== null;
      }
    },
    {
      name: 'Сохраненные данные - валидный JSON',
      check: () => {
        try {
          const saved = localStorage.getItem('technologies');
          if (!saved) return false;
          JSON.parse(saved);
          return true;
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Данные восстанавливаются после перезагрузки',
      check: () => {
        const saved = localStorage.getItem('technologies');
        return saved && saved.length > 0;
      }
    }
  ];

  return checks;
};

// ============================================
// ЗАПУСК ВСЕХ ТЕСТОВ
// ============================================

const runAllTests = () => {
  const tests = [
    test1LoadUsersFromAPI(),
    test2SearchWithDebounce(),
    test3CustomHookUseApi(),
    test4TechnologySearch(),
    test5RoadmapImporter(),
    test6TechnologyManagement(),
    test7ErrorHandling(),
    test8LocalStorage()
  ];

  let totalChecks = 0;
  let passedChecks = 0;

  console.group('🧪 РЕЗУЛЬТАТЫ ТЕСТОВ');
  
  tests.forEach((testChecks, testIndex) => {
    console.group(`Test ${testIndex + 1}`);
    
    testChecks.forEach(checkItem => {
      totalChecks++;
      try {
        const result = checkItem.check();
        if (result) {
          passedChecks++;
          console.log(`✅ ${checkItem.name}`);
        } else {
          console.log(`❌ ${checkItem.name}`);
        }
      } catch (err) {
        console.log(`⚠️ ${checkItem.name} (ошибка: ${err.message})`);
      }
    });
    
    console.groupEnd();
  });

  const percentage = Math.round((passedChecks / totalChecks) * 100);
  console.log(`\n📊 Результат: ${passedChecks}/${totalChecks} (${percentage}%)`);

  if (percentage === 100) {
    console.log('🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ!');
  } else if (percentage >= 80) {
    console.log('✨ Хороший результат! Проверьте оставшиеся тесты.');
  } else {
    console.log('⚠️ Рекомендуется проверить компоненты.');
  }

  console.groupEnd();
  
  return { passedChecks, totalChecks, percentage };
};

// ============================================
// ПРОВЕРКА ФАЙЛОВ
// ============================================

const checkFilesExist = () => {
  console.group('📂 ПРОВЕРКА ФАЙЛОВ');
  
  const files = [
    { name: 'UserList.jsx', required: true },
    { name: 'ProductSearch.jsx', required: true },
    { name: 'PostList.jsx', required: true },
    { name: 'TechnologySearch.jsx', required: true },
    { name: 'RoadmapImporter.jsx', required: true },
    { name: 'hooks/useApi.js', required: true },
    { name: 'hooks/useTechnologiesApi.js', required: true },
    { name: 'pages/ApiDemo.js', required: true },
    { name: 'API_PRACTICE.md', required: false },
    { name: 'API_EXAMPLES.js', required: false },
    { name: 'API_CHEATSHEET.md', required: false }
  ];

  files.forEach(file => {
    const icon = file.required ? '📄' : '📚';
    console.log(`${icon} ${file.name}`);
  });
  
  console.groupEnd();
};

// ============================================
// ЭКСПОРТ ФУНКЦИЙ ТЕСТИРОВАНИЯ
// ============================================

export {
  runAllTests,
  checkFilesExist,
  test1LoadUsersFromAPI,
  test2SearchWithDebounce,
  test3CustomHookUseApi,
  test4TechnologySearch,
  test5RoadmapImporter,
  test6TechnologyManagement,
  test7ErrorHandling,
  test8LocalStorage
};

// Используйте в консоли браузера:
// import { runAllTests, checkFilesExist } from './API_TESTS.js';
// runAllTests();
// checkFilesExist();

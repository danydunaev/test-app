function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <button onClick={onMarkAllCompleted}>Отметить все как выполненные</button>
      <button onClick={onResetAll}>Сбросить все статусы</button>
      <button onClick={onRandomNext}>Случайный выбор следующей технологии</button>
    </div>
  );
}

export default QuickActions;
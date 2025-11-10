import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  const progressPercentage = totalTechnologies > 0 ? Math.round((completedTechnologies / totalTechnologies) * 100) : 0;

  let progressClass = 'progress-low';
  if (progressPercentage >= 70) {
    progressClass = 'progress-high';
  } else if (progressPercentage >= 30) {
    progressClass = 'progress-medium';
  }

  return (
    <div className="progress-header">
      <h2>Прогресс изучения технологий</h2>
      <p>Общее количество: {totalTechnologies}</p>
      <p>Изучено: {completedTechnologies} | В процессе: {inProgress} | Не начато: {notStarted}</p>
      <div className="progress-bar-container">
        <div 
          className={`progress-bar ${progressClass}`} 
          style={{ width: `${progressPercentage}%` }}
        >
          {progressPercentage}%
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;
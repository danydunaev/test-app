import './TechnologyCard.css';

function TechnologyCard({ title, description, status, onStatusChange }) {
  const handleClick = () => {
    let newStatus;
    if (status === 'not-started') {
      newStatus = 'in-progress';
    } else if (status === 'in-progress') {
      newStatus = 'completed';
    } else {
      newStatus = 'not-started';
    }
    onStatusChange(newStatus);
  };

  let statusIndicator;
  let cardClass = `technology-card status-${status.replace(/ /g, '-')}`; // Для стилей, напр. status-not-started

  if (status === 'completed') {
    statusIndicator = '✅ Completed';
  } else if (status === 'in-progress') {
    statusIndicator = '⏳ In Progress';
  } else {
    statusIndicator = '❌ Not Started';
  }

  return (
    <div className={cardClass} onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="status">{statusIndicator}</p>
    </div>
  );
}

export default TechnologyCard;
interface IconProps {
  type: 'calendar' | 'time' | 'location' | 'campus' | 'audience';
}

export const Icon = ({ type }: IconProps) => {
  const getIcon = () => {
    switch (type) {
      case 'calendar':
        return '🗓';
      case 'time':
        return '🕒';
      case 'location':
        return '📍';
      case 'campus':
        return '🏛';
      case 'audience':
        return '👥';
      default:
        return '';
    }
  };

  return (
    <span className="icon">
      {getIcon()}
    </span>
  );
}; 
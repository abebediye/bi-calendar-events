import { CAMPUS_NAMES, CAMPUS_DISPLAY_NAMES, CampusName } from '../constants/campusConfig';
import { AUDIENCE_DISPLAY_NAMES } from '../constants/audienceConfig';

export const parseFilterList = (filterList?: string) => {
  if (!filterList) {
    return {
      campus: null,
      audienceTypes: []
    };
  }

  const filters = filterList.split(',').map(filter => filter.trim());
  
  const campus = filters.find(filter => CAMPUS_NAMES.has(filter as CampusName));
  const audienceTypes = filters
    .filter(filter => !CAMPUS_NAMES.has(filter as CampusName))
    .map(audience => AUDIENCE_DISPLAY_NAMES[audience] || formatDisplayText(audience));

  return {
    campus: campus ? CAMPUS_DISPLAY_NAMES[campus as CampusName] : null,
    audienceTypes
  };
};

export const formatDisplayText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, ' ');
}; 
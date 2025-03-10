export interface FilterOption {
  key: string;
  text: string;
  value: string;
}

export interface Filters {
  language?: string;
  campus?: string;
  audience?: string;
  resultsLimit?: number;
}

export interface FilterOptions {
  languages: FilterOption[];
  campuses: FilterOption[];
  audiences: FilterOption[];
}

// Language display names mapping
const languageNames: { [key: string]: string } = {
  en: 'English',
  no: 'Norwegian'
};

// Results limit options
export const RESULTS_LIMIT_OPTIONS = [
  { key: '10', value: '10', text: '10 Results' },
  { key: '25', value: '25', text: '25 Results' },
  { key: '50', value: '50', text: '50 Results' },
  { key: '100', value: '100', text: '100 Results' }
];

// Empty filter options that will be populated from API response
export let filterOptions: FilterOptions = {
  languages: [],
  campuses: [],
  audiences: []
};

export const updateLanguageOptions = (languages: string[]) => {
  const uniqueLanguages = Array.from(new Set(languages));
  filterOptions.languages = uniqueLanguages.map(lang => ({
    key: lang,
    value: lang,
    text: languageNames[lang] || lang.toUpperCase()
  }));
}; 

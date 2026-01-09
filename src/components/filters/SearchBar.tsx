import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useFilterStore } from '../../store/filterStore';
import { useCountries } from '../../hooks/useCountries';
import { debounce } from '../../utils/formatters';

export const SearchBar: React.FC = () => {
  const { search, setSearch } = useFilterStore();
  const [localSearch, setLocalSearch] = useState(search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { data: countries } = useCountries();

  const debouncedSetSearch = React.useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [setSearch]
  );

  useEffect(() => {
    debouncedSetSearch(localSearch);
  }, [localSearch, debouncedSetSearch]);

  const suggestions = useMemo(() => {
    if (!countries || localSearch.length < 2) return [];

    const searchLower = localSearch.toLowerCase();
    return countries
      .filter(country =>
        country.name.common.toLowerCase().includes(searchLower) ||
        country.name.official.toLowerCase().includes(searchLower) ||
        country.capital?.some(cap => cap.toLowerCase().includes(searchLower))
      )
      .slice(0, 8);
  }, [countries, localSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (countryName: string) => {
    setLocalSearch(countryName);
    setSearch(countryName);
    setShowSuggestions(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSelectSuggestion(suggestions[focusedIndex].name.common);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setFocusedIndex(-1);
        break;
    }
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Search Countries
      </label>
      <input
        ref={inputRef}
        type="text"
        value={localSearch}
        onChange={(e) => {
          setLocalSearch(e.target.value);
          setShowSuggestions(true);
          setFocusedIndex(-1);
        }}
        onFocus={() => localSearch.length >= 2 && setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search by name or capital..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {suggestions.map((country, index) => (
            <button
              key={country.cca3}
              onClick={() => handleSelectSuggestion(country.name.common)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                index === focusedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-6 h-4 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {country.name.common}
                </div>
                {country.capital && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {country.capital[0]}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {country.region}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

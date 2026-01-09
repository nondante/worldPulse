import { useMemo } from 'react';
import type { Country } from '../types/country';
import { useFilterStore } from '../store/filterStore';

export const useFilteredCountries = (countries: Country[] | undefined) => {
  const { search, regions, populationRange, areaRange } = useFilterStore();

  return useMemo(() => {
    if (!countries) return [];

    let filtered = [...countries];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchLower) ||
        country.name.official.toLowerCase().includes(searchLower) ||
        country.capital?.some(cap => cap.toLowerCase().includes(searchLower))
      );
    }

    // Region filter
    if (regions.length > 0) {
      filtered = filtered.filter(country => regions.includes(country.region));
    }

    // Population range filter
    filtered = filtered.filter(country =>
      country.population >= populationRange[0] &&
      country.population <= populationRange[1]
    );

    // Area range filter
    filtered = filtered.filter(country =>
      country.area >= areaRange[0] &&
      country.area <= areaRange[1]
    );

    return filtered;
  }, [countries, search, regions, populationRange, areaRange]);
};

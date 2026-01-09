import type { Country, RegionData, LanguageData, Statistics, ChartDataPoint, ScatterDataPoint } from '../types/country';

export const REGION_COLORS: Record<string, string> = {
  Africa: '#f59e0b',
  Americas: '#10b981',
  Asia: '#ef4444',
  Europe: '#3b82f6',
  Oceania: '#8b5cf6',
  Antarctic: '#6b7280',
};

export const getRegionData = (countries: Country[]): RegionData[] => {
  const regionMap = new Map<string, RegionData>();

  countries.forEach(country => {
    const existing = regionMap.get(country.region);
    if (existing) {
      existing.count++;
      existing.totalPopulation += country.population;
      existing.averageArea = (existing.averageArea * (existing.count - 1) + country.area) / existing.count;
    } else {
      regionMap.set(country.region, {
        region: country.region,
        count: 1,
        totalPopulation: country.population,
        averageArea: country.area,
        color: REGION_COLORS[country.region] || '#6b7280',
      });
    }
  });

  return Array.from(regionMap.values());
};

export const getLanguageData = (countries: Country[]): LanguageData[] => {
  const languageMap = new Map<string, LanguageData>();

  countries.forEach(country => {
    if (country.languages) {
      Object.values(country.languages).forEach(language => {
        const existing = languageMap.get(language);
        if (existing) {
          existing.count++;
          existing.countries.push(country.name.common);
        } else {
          languageMap.set(language, {
            language,
            count: 1,
            countries: [country.name.common],
          });
        }
      });
    }
  });

  return Array.from(languageMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
};

export const getTopCountriesByPopulation = (countries: Country[], limit: number = 20): ChartDataPoint[] => {
  return countries
    .sort((a, b) => b.population - a.population)
    .slice(0, limit)
    .map(country => ({
      name: country.name.common,
      value: country.population,
      color: REGION_COLORS[country.region],
    }));
};

export const getPopulationVsAreaData = (countries: Country[]): ScatterDataPoint[] => {
  return countries.map(country => ({
    name: country.name.common,
    x: country.area,
    y: country.population,
    region: country.region,
  }));
};

export const getStatistics = (countries: Country[]): Statistics => {
  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
  const totalArea = countries.reduce((sum, c) => sum + c.area, 0);
  const regions = new Set(countries.map(c => c.region));

  return {
    totalCountries: countries.length,
    totalPopulation,
    averagePopulation: totalPopulation / countries.length,
    totalArea,
    averageArea: totalArea / countries.length,
    regionCount: regions.size,
  };
};

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toFixed(0);
};

export const formatArea = (area: number): string => {
  return `${formatNumber(area)} km²`;
};

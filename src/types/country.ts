export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  region: Region;
  subregion?: string;
  latlng: [number, number];
  area: number;
  population: number;
  languages?: { [key: string]: string };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital?: string[];
  flags: {
    svg: string;
    png: string;
  };
  continents: string[];
  capitalInfo?: {
    latlng: [number, number];
  };
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';

export interface FilterState {
  search: string;
  regions: Region[];
  populationRange: [number, number];
  areaRange: [number, number];
}

export interface ChartVisibility {
  worldMap: boolean;
  populationChart: boolean;
  areaChart: boolean;
  regionDistribution: boolean;
  languageChart: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface ScatterDataPoint {
  name: string;
  x: number;
  y: number;
  region: Region;
}

export interface RegionData {
  region: Region;
  count: number;
  totalPopulation: number;
  averageArea: number;
  color: string;
}

export interface LanguageData {
  language: string;
  count: number;
  countries: string[];
}

export interface Statistics {
  totalCountries: number;
  totalPopulation: number;
  averagePopulation: number;
  totalArea: number;
  averageArea: number;
  regionCount: number;
}

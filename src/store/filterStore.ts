import { create } from 'zustand';
import type { FilterState, Region, ChartVisibility } from '../types/country';

interface FilterStore extends FilterState {
  chartVisibility: ChartVisibility;
  setSearch: (search: string) => void;
  setRegions: (regions: Region[]) => void;
  toggleRegion: (region: Region) => void;
  setPopulationRange: (range: [number, number]) => void;
  setAreaRange: (range: [number, number]) => void;
  toggleChart: (chart: keyof ChartVisibility) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  search: '',
  regions: [],
  populationRange: [0, 1500000000],
  areaRange: [0, 17100000],
};

const initialChartVisibility: ChartVisibility = {
  worldMap: true,
  populationChart: true,
  areaChart: true,
  regionDistribution: true,
  languageChart: true,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  chartVisibility: initialChartVisibility,

  setSearch: (search) => set({ search }),

  setRegions: (regions) => set({ regions }),

  toggleRegion: (region) => set((state) => {
    const regions = state.regions.includes(region)
      ? state.regions.filter(r => r !== region)
      : [...state.regions, region];
    return { regions };
  }),

  setPopulationRange: (populationRange) => set({ populationRange }),

  setAreaRange: (areaRange) => set({ areaRange }),

  toggleChart: (chart) => set((state) => ({
    chartVisibility: {
      ...state.chartVisibility,
      [chart]: !state.chartVisibility[chart],
    },
  })),

  resetFilters: () => set({ ...initialState, chartVisibility: initialChartVisibility }),
}));

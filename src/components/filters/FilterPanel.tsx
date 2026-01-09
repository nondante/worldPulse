import React from 'react';
import { SearchBar } from './SearchBar';
import { RegionFilter } from './RegionFilter';
import { useFilterStore } from '../../store/filterStore';
import { Card } from '../ui/Card';

export const FilterPanel: React.FC = () => {
  const { chartVisibility, toggleChart, resetFilters } = useFilterStore();

  const charts = [
    { key: 'worldMap' as const, label: 'World Map' },
    { key: 'populationChart' as const, label: 'Population Chart' },
    { key: 'areaChart' as const, label: 'Area Chart' },
    { key: 'regionDistribution' as const, label: 'Region Distribution' },
    { key: 'languageChart' as const, label: 'Language Chart' },
  ];

  return (
    <Card className="h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          Reset All
        </button>
      </div>

      <SearchBar />
      <RegionFilter />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Visible Charts
        </label>
        <div className="space-y-2">
          {charts.map((chart) => (
            <label
              key={chart.key}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={chartVisibility[chart.key]}
                onChange={() => toggleChart(chart.key)}
                className="w-4 h-4 text-primary-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {chart.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
};

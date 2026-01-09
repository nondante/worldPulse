import React from 'react';
import { useFilterStore } from '../../store/filterStore';
import type { Region } from '../../types/country';
import { REGION_COLORS } from '../../utils/dataTransformers';

const REGIONS: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const RegionFilter: React.FC = () => {
  const { regions, toggleRegion } = useFilterStore();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Filter by Region
      </label>
      <div className="flex flex-wrap gap-2">
        {REGIONS.map((region) => {
          const isSelected = regions.includes(region);
          return (
            <button
              key={region}
              onClick={() => toggleRegion(region)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'text-white shadow-md transform scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              style={isSelected ? { backgroundColor: REGION_COLORS[region] } : {}}
            >
              {region}
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useCountries } from './hooks/useCountries';
import { useFilteredCountries } from './hooks/useFilters';
import { useFilterStore } from './store/filterStore';
import { FilterPanel } from './components/filters/FilterPanel';
import { StatCard } from './components/ui/StatCard';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { PopulationChart } from './components/charts/PopulationChart';
import { AreaChart } from './components/charts/AreaChart';
import { RegionDistribution } from './components/charts/RegionDistribution';
import { LanguageChart } from './components/charts/LanguageChart';
import { WorldMap } from './components/map/WorldMap';
import { getStatistics, formatNumber } from './utils/dataTransformers';

function App() {
  const [isDark, setIsDark] = useState(false);
  const { data: countries, isLoading, error } = useCountries();
  const filteredCountries = useFilteredCountries(countries);
  const { chartVisibility } = useFilterStore();

  const stats = useMemo(() => {
    return getStatistics(filteredCountries);
  }, [filteredCountries]);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading country data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                WorldPulse
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Global Country Data Dashboard
              </p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <FilterPanel />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Countries"
                value={stats.totalCountries}
              />
              <StatCard
                title="Total Population"
                value={formatNumber(stats.totalPopulation)}
              />
              <StatCard
                title="Total Area"
                value={formatNumber(stats.totalArea) + ' km²'}
              />
              <StatCard
                title="Regions"
                value={stats.regionCount}
              />
            </div>

            {/* World Map */}
            {chartVisibility.worldMap && <WorldMap countries={filteredCountries} />}

            {/* Charts Grid */}
            {(chartVisibility.populationChart || chartVisibility.regionDistribution) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {chartVisibility.populationChart && <PopulationChart countries={filteredCountries} />}
                {chartVisibility.regionDistribution && <RegionDistribution countries={filteredCountries} />}
              </div>
            )}

            {chartVisibility.areaChart && <AreaChart countries={filteredCountries} />}
            {chartVisibility.languageChart && <LanguageChart countries={filteredCountries} />}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Data sourced from REST Countries API</p>
          <p className="text-sm mt-2">
            Showing {filteredCountries.length} of {countries?.length || 0} countries
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

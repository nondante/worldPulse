import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../ui/Card';
import { getTopCountriesByPopulation, formatNumber } from '../../utils/dataTransformers';
import type { Country } from '../../types/country';

interface PopulationChartProps {
  countries: Country[];
}

export const PopulationChart: React.FC<PopulationChartProps> = ({ countries }) => {
  const data = useMemo(() => getTopCountriesByPopulation(countries, 20), [countries]);

  return (
    <Card title="Top 20 Countries by Population">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={120}
            interval={0}
            className="text-gray-600 dark:text-gray-400"
            tick={{ fontSize: 11 }}
          />
          <YAxis
            className="text-gray-600 dark:text-gray-400"
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [formatNumber(value), 'Population']}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

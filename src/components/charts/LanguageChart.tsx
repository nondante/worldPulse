import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { getLanguageData } from '../../utils/dataTransformers';
import type { Country } from '../../types/country';

interface LanguageChartProps {
  countries: Country[];
}

export const LanguageChart: React.FC<LanguageChartProps> = ({ countries }) => {
  const data = useMemo(() => {
    return getLanguageData(countries).map(lang => ({
      name: lang.language,
      value: lang.count,
    }));
  }, [countries]);

  return (
    <Card title="Top 15 Most Spoken Languages">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis type="number" className="text-gray-600 dark:text-gray-400" />
          <YAxis
            type="category"
            dataKey="name"
            className="text-gray-600 dark:text-gray-400"
            width={90}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
            formatter={(value: number | undefined) => [value ?? 0, 'Countries']}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

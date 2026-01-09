import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { Card } from '../ui/Card';
import { getPopulationVsAreaData, REGION_COLORS, formatNumber } from '../../utils/dataTransformers';
import type { Country } from '../../types/country';

interface AreaChartProps {
  countries: Country[];
}

export const AreaChart: React.FC<AreaChartProps> = ({ countries }) => {
  const data = useMemo(() => getPopulationVsAreaData(countries), [countries]);

  return (
    <Card title="Population vs Area">
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis
            type="number"
            dataKey="x"
            name="Area"
            className="text-gray-600 dark:text-gray-400"
            tickFormatter={(value) => formatNumber(value)}
            label={{ value: 'Area (km²)', position: 'bottom', offset: 40 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Population"
            className="text-gray-600 dark:text-gray-400"
            tickFormatter={(value) => formatNumber(value)}
            width={100}
            label={{ value: 'Population', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <ZAxis range={[50, 400]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
            formatter={(value: number | undefined, name: string) => {
              if (!value) return ['0', name];
              if (name === 'Area') return [formatNumber(value) + ' km²', 'Area'];
              if (name === 'Population') return [formatNumber(value), 'Population'];
              return [value, name];
            }}
          />
          {Object.keys(REGION_COLORS).map((region) => (
            <Scatter
              key={region}
              name={region}
              data={data.filter((d) => d.region === region)}
              fill={REGION_COLORS[region]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};

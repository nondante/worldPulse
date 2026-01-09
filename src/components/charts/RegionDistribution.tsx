import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Card';
import { getRegionData } from '../../utils/dataTransformers';
import type { Country } from '../../types/country';

interface RegionDistributionProps {
  countries: Country[];
}

export const RegionDistribution: React.FC<RegionDistributionProps> = ({ countries }) => {
  const data = useMemo(() => {
    return getRegionData(countries).map(region => ({
      name: region.region,
      value: region.count,
      color: region.color,
    }));
  }, [countries]);

  return (
    <Card title="Countries by Region">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [value, 'Countries']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

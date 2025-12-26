'use client';

import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
interface CategoryChartProps {
  companies: any[]; 
}

export default function CategoryChart({ companies }: CategoryChartProps) {
  const chartData = useMemo(() => {
    const categoryMap = new Map<string, number>();

    companies.forEach(company => {
      // 1. brands 배열 확인
      if (company.brands && Array.isArray(company.brands)) {
        company.brands.forEach((brand: any) => {
          const cat = brand.category || 'Other';
          const currentCount = categoryMap.get(cat) || 0;
          categoryMap.set(cat, currentCount + 1);
        });
      } else {
        // 2. 메인 category 확인
        const category = company.category || 'Other';
        const currentCount = categoryMap.get(category) || 0;
        categoryMap.set(category, currentCount + 1);
      }
    });

    const labels = Array.from(categoryMap.keys());
    const data = Array.from(categoryMap.values());

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#10B981', // Emerald
            '#3B82F6', // Blue
            '#F59E0B', // Amber
            '#EF4444', // Red
            '#8B5CF6', // Violet
            '#EC4899', // Pink
            '#6366F1', // Indigo
            '#14B8A6', // Teal
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [companies]);

  if (!companies || companies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-stone-500 text-sm">
        No Data
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <h3 className="text-sm font-bold text-stone-700 mb-4 uppercase tracking-wider">Market Distribution</h3>
      <div className="relative h-48 w-full">
        <Doughnut 
          data={chartData} 
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  boxWidth: 12,
                  font: { size: 11 },
                  color: '#44403C'
                }
              }
            }
          }} 
        />
      </div>
    </div>
  );
}
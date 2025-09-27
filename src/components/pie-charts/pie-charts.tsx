'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { mockPieChartData } from '@/constants/pie-chart-mock';
import { mockPieChartColors } from '@/constants/pie-chart-mock';

export const PieCharts = () => (
  <div className="w-full bg-white border rounded-2xl">
    <h3 className="text-2xl font-semibold mb-4 mt-4 text-center">Principais Setores por CNAE</h3>
    <ResponsiveContainer width="100%" height={800}>
      <PieChart>
        <Pie
          data={mockPieChartData}
          cx="50%"
          cy="50%"
          outerRadius={300}
          dataKey="value"
        >
          {mockPieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={mockPieChartColors[index % mockPieChartColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />

        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

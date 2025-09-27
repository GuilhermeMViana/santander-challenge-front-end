'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { mockPieChartData } from '@/constants/pie-chart-mock';
import { mockPieChartColors } from '@/constants/pie-chart-mock';

export const PieCharts = () => (
  <div className="w-full">
    <h3 className="text-xl font-semibold mb-4 text-center">Distribuição de Gastos</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={mockPieChartData}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {mockPieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={mockPieChartColors[index % mockPieChartColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
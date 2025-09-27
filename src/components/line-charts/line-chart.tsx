'use client'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { mockSaldoData } from '@/constants/line-chart-mock';

export const LineCharts = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={mockSaldoData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip formatter={(value) => `R$ ${value}`} />
      <Line 
        type="linear" 
        dataKey="saldo" 
        stroke="#3b82f6" 
        strokeWidth={2}
        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
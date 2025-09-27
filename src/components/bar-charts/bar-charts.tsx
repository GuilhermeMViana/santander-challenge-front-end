'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { mockEntradaSaidaData } from '@/constants/bar-chart-mock';

export const BarCharts = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockEntradaSaidaData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="entrada" fill="#10b981" />
        <Bar dataKey="saida" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};
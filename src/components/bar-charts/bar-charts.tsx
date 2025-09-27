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
        <Bar dataKey="entrada" fill="#8884d8" />
        <Bar dataKey="saida" fill="#c1c1c1" />
      </BarChart>
    </ResponsiveContainer>
  );
};
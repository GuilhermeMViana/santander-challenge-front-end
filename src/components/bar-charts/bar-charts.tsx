'use client';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';

export const BarCharts = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Configuração de headers para CORS
        const response = await fetch('http://127.0.0.1:5000/transactions/graphs/barChart?id=CNPJ_00010', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          mode: 'cors', // Explicitamente definir o modo CORS
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data);
        setLoading(false);
        
      } catch (err) {
        setError('Erro ao carregar transações');
        console.error('Erro na requisição:', err);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="text-gray-500">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={transactions}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="#10b981" />
        <Bar dataKey="expense" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};
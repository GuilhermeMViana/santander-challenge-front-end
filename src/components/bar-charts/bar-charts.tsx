'use client';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import { useCnpjID } from '@/contexts/cnpj-id'; // Assumindo que este caminho está correto

export const BarCharts = () => {
  const { id } = useCnpjID();
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('ID do contexto mudou:', id);

    if (!id || id.trim() === '') {
        setLoading(false);
        setTransactions([]);
        setError(null);
        return; 
    }
    
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
        
      try {
        const apiUrl = `http://127.0.0.1:5001/transactions/graphs/barChart?id=CNPJ_${id}`; 

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data);
        
      } catch (err) {
        setError(`Erro ao carregar transações para ID: ${id}`);
        console.error('Erro na requisição:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

  }, [id]);

  if (!id || id.trim() === '') {
    return (
        <div className="flex items-center justify-center h-[300px] bg-white border rounded-2xl">
            <div className="text-gray-500">Aguardando ID do Cliente para buscar dados.</div>
        </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-white border rounded-2xl">
        <div className="text-gray-500">Carregando dados para ID: {id}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-white border rounded-2xl">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  
  if (transactions.length === 0) {
      return (
          <div className="flex items-center justify-center h-[300px] bg-white border rounded-2xl">
              <div className="text-gray-500">Nenhum dado encontrado para o ID: {id}.</div>
          </div>
      );
  }

  return (
    <div className="p-4 bg-white border rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">Gráfico de Receitas e Despesas - ID: {id}</h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#10b981" name="Entrada" />
            <Bar dataKey="expense" fill="#ef4444" name="Saída" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
};
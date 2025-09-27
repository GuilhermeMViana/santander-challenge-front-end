'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { mockPieChartColors } from '@/constants/pie-chart-mock';
import { useEffect, useState } from 'react';

export const PieCharts = () => {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/cnae/graphs/pieChart')
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos da API:', data);
        setApi(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      });
  }, []);

  // Função para formatar os dados se necessário
  const formatDataForChart = (data) => {
    return data.map(item => ({
      name: item.cnae, // Nome que aparecerá na legenda
      value: item.accounts, // Valor usado para calcular o tamanho da fatia
      cnae: item.cnae, // Mantém o campo original
      accounts: item.accounts // Mantém o campo original
    }));
  };

  if (loading) {
    return (
      <div className="w-full bg-white border rounded-2xl p-8 flex justify-center items-center">
        <p>Carregando dados...</p>
      </div>
    );
  }

  const chartData = formatDataForChart(api);

  return (
    <div className="w-full bg-white border rounded-2xl">
      <h3 className="text-2xl font-semibold mb-4 mt-4 text-center">Principais Setores por CNAE</h3>
      <ResponsiveContainer width="100%" height={800}>
        <PieChart>
          <Pie
            data={chartData} // Usando os dados formatados
            cx="50%"
            cy="50%"
            outerRadius={300}
            dataKey="value" // Mudança principal: usar "value" em vez de "cnae"
            nameKey="name" // Define qual campo usar para o nome na legenda
          >
            {/* Agora mapeia sobre os dados reais da API */}
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={mockPieChartColors[index % mockPieChartColors.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [
              `${value} contas`, // Formata o valor
              name // Mostra o nome do CNAE
            ]}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center" 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
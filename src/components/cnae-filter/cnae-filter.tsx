'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CNAEFilterProps {
  onFilterChange: (cnae: string) => void;
  selectedCNAE: string;
}

export function CNAEFilter({ onFilterChange, selectedCNAE }: CNAEFilterProps) {
  const [cnaeOptions, setCnaeOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar opções de CNAE da API do pie chart
    const fetchCNAEOptions = async () => {
      try {
        const response = await fetch('/api/cnae/pie-chart');
        
        if (!response.ok) {
          throw new Error('Failed to fetch CNAE options');
        }

        const data = await response.json();
        
        // Extrair os CNAEs únicos dos dados do pie chart
        const cnaeList = data.map((item: any) => item.cnae);
        setCnaeOptions(cnaeList);
        
      } catch (error) {
        console.error('Error fetching CNAE options:', error);
        // Fallback para lista mock em caso de erro
        const mockCnaeList = [
          "Atividades de consultoria em gestão empresarial",
          "Comércio varejista de artigos do vestuário e acessórios", 
          "Outras atividades de serviços prestados principalmente às empresas",
          "Atividades de organizações associativas ligadas à cultura e à arte",
          "Desenvolvimento de programas de computador sob encomenda",
          "Comércio varejista especializado de equipamentos e suprimentos de informática",
          "Fabricação de produtos de padaria, confeitaria e pastelaria",
          "Serviços de catering, bufê e outros serviços de comida preparada",
        ];
        setCnaeOptions(mockCnaeList);
      } finally {
        setLoading(false);
      }
    };

    fetchCNAEOptions();
  }, []);

  const handleCnaeChange = (value: string) => {
    onFilterChange(value);
  };

  const handleClearFilter = () => {
    onFilterChange('');
  };

  if (loading) {
    return (
      <div className="w-full p-4 border rounded-2xl bg-white">
        <p className="text-center text-gray-500">Carregando filtros...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 border rounded-2xl bg-white mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtrar por CNAE</h3>
      
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o CNAE:
          </label>
          <Select value={selectedCNAE} onValueChange={handleCnaeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um CNAE..." />
            </SelectTrigger>
            <SelectContent>
              {cnaeOptions.map((cnae) => (
                <SelectItem key={cnae} value={cnae}>
                  {cnae}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleClearFilter}
            variant="default"
            disabled={!selectedCNAE}
          >
            Limpar
          </Button>
        </div>
      </div>
      
      {selectedCNAE && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">CNAE selecionado:</span> {selectedCNAE}
          </p>
        </div>
      )}
    </div>
  );
}
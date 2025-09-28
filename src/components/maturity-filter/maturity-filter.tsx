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

interface MaturityFilterProps {
  onFilterChange: (state: string) => void;
  selectedState: string;
}

export function MaturityFilter({ onFilterChange, selectedState }: MaturityFilterProps) {
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar opções de maturidade da API overview
    const fetchMaturityOptions = async () => {
      try {
        const response = await fetch('/api/maturity/overview');
        
        if (!response.ok) {
          throw new Error('Failed to fetch maturity options');
        }

        const data = await response.json();
        
        // Extrair os estados de maturidade dos dados
        const states = Object.keys(data).filter(key => data[key] > 0);
        setStateOptions(states);
        
      } catch (error) {
        console.error('Error fetching maturity options:', error);
        // Fallback para lista padrão em caso de erro
        const defaultStates = ['Iniciante', 'Madura', 'Expansão', 'Declínio'];
        setStateOptions(defaultStates);
      } finally {
        setLoading(false);
      }
    };

    fetchMaturityOptions();
  }, []);

  const handleStateChange = (value: string) => {
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
      <h3 className="text-lg font-semibold mb-4">Filtrar por Maturidade</h3>
      
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o estado de maturidade:
          </label>
          <Select value={selectedState} onValueChange={handleStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um estado..." />
            </SelectTrigger>
            <SelectContent>
              {stateOptions.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleClearFilter}
            variant="default"
            disabled={!selectedState}
          >
            Limpar
          </Button>
        </div>
      </div>
      
      {selectedState && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Estado selecionado:</span> {selectedState}
          </p>
        </div>
      )}
    </div>
  );
}
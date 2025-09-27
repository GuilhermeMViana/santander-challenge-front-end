"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { X } from "lucide-react"
import { MONTHS } from "@/components/constants/months-mock"
import { PAYMENT_TYPES } from "@/components/constants/payment-types-mock"


interface TableFiltersProps {
  onFiltersApply?: (filters: FilterData) => void
  className?: string
}

export interface FilterData {
  months: string[]
  transactionType: "entrada" | "saida" | ""
  paymentType: string[]
  clients: string[]
}

export const TableFilters = ({ onFiltersApply, className = "" }: TableFiltersProps) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [transactionType, setTransactionType] = useState<"entrada" | "saida" | "todos">("todos")
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<string[]>([])
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [clientInputValue, setClientInputValue] = useState("00000")

  const handleMonthSelect = (monthValue: string) => {
    if (selectedMonths.includes(monthValue)) {
      setSelectedMonths(prev => prev.filter(month => month !== monthValue))
    } else {
      setSelectedMonths(prev => [...prev, monthValue])
    }
  }

  const handlePaymentTypeSelect = (paymentType: string) => {
    if (selectedPaymentTypes.includes(paymentType)) {
      setSelectedPaymentTypes(prev => prev.filter(type => type !== paymentType))
    } else {
      setSelectedPaymentTypes(prev => [...prev, paymentType])
    }
  }

  const handleClientInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir apenas números
    const numericValue = e.target.value.replace(/[^0-9]/g, '')

    const formattedValue = numericValue.padStart(5, "0").slice(-5)

    setClientInputValue(formattedValue)
  }

  const handleClientInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && clientInputValue.trim() !== '') {
      // Adicionar o valor ao filtro se não existir já
      if (!selectedClients.includes(clientInputValue)) {
        setSelectedClients(prev => [...prev, clientInputValue])
      }
      setClientInputValue('00000') // Limpar o input
    }
  }

  const removeMonth = (monthValue: string) => {
    setSelectedMonths(prev => prev.filter(month => month !== monthValue))
  }

  const removePaymentType = (paymentType: string) => {
    setSelectedPaymentTypes(prev => prev.filter(type => type !== paymentType))
  }

  const removeClient = (clientValue: string) => {
    setSelectedClients(prev => prev.filter(client => client !== clientValue))
  }

  const handleApplyFilters = () => {
    const filters: FilterData = {
      months: selectedMonths,
      transactionType: transactionType === "todos" ? "" : transactionType,
      paymentType: selectedPaymentTypes,
      clients: selectedClients
    }
    
    if (onFiltersApply) {
      onFiltersApply(filters)
    }
  }

  const clearAllFilters = () => {
    setSelectedMonths([])
    setTransactionType("todos")
    setSelectedPaymentTypes([])
    setSelectedClients([])
    setClientInputValue("00000")
  }

  const getMonthLabel = (value: string) => MONTHS.find(m => m.value === value)?.label || value
  const getPaymentTypeLabel = (value: string) => PAYMENT_TYPES.find(p => p.value === value)?.label || value

  return (
    <div className={`p-6 border rounded-2xl bg-white shadow-sm space-y-6 ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Filtros da Tabela</h3>
        <Button 
          variant="default" 
          onClick={clearAllFilters}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Limpar Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Filtro de Mês */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Mês</h4>
          <Select onValueChange={handleMonthSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione os meses" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map(month => (
                <SelectItem 
                  key={month.value} 
                  value={month.value}
                  className={selectedMonths.includes(month.value) ? "bg-red-50 text-red-700" : ""}
                >
                  {month.label} {selectedMonths.includes(month.value) && "✓"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Tags dos meses selecionados */}
          {selectedMonths.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedMonths.map(month => (
                <span 
                  key={month}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                >
                  {getMonthLabel(month)}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-900" 
                    onClick={() => removeMonth(month)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Filtro de Tipo de Transação */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Tipo de Transação</h4>
          <Select value={transactionType} onValueChange={(value) => setTransactionType(value as "entrada" | "saida" | "todos")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="entrada">Entrada</SelectItem>
              <SelectItem value="saida">Saída</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Tipo de Pagamento */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Tipo de Pagamento</h4>
          <Select onValueChange={handlePaymentTypeSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione os tipos" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_TYPES.map(paymentType => (
                <SelectItem 
                  key={paymentType.value} 
                  value={paymentType.value}
                  className={selectedPaymentTypes.includes(paymentType.value) ? "bg-red-50 text-red-700" : ""}
                >
                  {paymentType.label} {selectedPaymentTypes.includes(paymentType.value) && "✓"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Tags dos tipos de pagamento selecionados */}
          {selectedPaymentTypes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedPaymentTypes.map(paymentType => (
                <span 
                  key={paymentType}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                >
                  {getPaymentTypeLabel(paymentType)}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-900" 
                    onClick={() => removePaymentType(paymentType)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Filtro de Cliente */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Cliente/Provedor</h4>
          <Input
            type="text"
            placeholder="Digite números e pressione Enter..."
            value={clientInputValue}
            onChange={handleClientInputChange}
            onKeyPress={handleClientInputKeyPress}
            className="w-full border-gray-200 focus:border-red-500 focus:ring-red-500/20"
          />
          
          {/* Tags dos clientes selecionados */}
          {selectedClients.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedClients.map(client => (
                <span 
                  key={client}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                >
                  {client}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-900" 
                    onClick={() => removeClient(client)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Botão de Confirmar */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button 
          variant="active" 
          onClick={handleApplyFilters}
          className="px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white"
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}
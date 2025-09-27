'use client';

import { TableFilters, FilterData } from '@/components/table-filters';
import { TransactionsTable } from '@/components/transactions-table';
import React, { useState } from 'react';
import { useCnpjID } from '../contexts/cnpj-id';

export const CompanyTransactions: React.FC = () => {
    const { id } = useCnpjID();
    const [filters, setFilters] = useState<FilterData>({
        months: [],
        transactionType: "",
        paymentType: [],
        clients: []
    });

    const handleFiltersApply = (newFilters: FilterData) => {
        console.log('Filtros aplicados:', newFilters);
        setFilters(newFilters);
    };
    
    return (
        <div className="company-transactions mt-5">
            <TableFilters onFiltersApply={handleFiltersApply} />
            <TransactionsTable 
                title="Últimas Transações" 
                queryParams={{ id }} 
                filters={filters}
            />
        </div>
    );
};
'use client';
import { type TransactionTableProps, FilterData } from './props'
import { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const TransactionsTable = ({ title, queryParams, filters }: TransactionTableProps) => {
    
    const [transactions, setTransactions] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        console.log('ID do contexto mudou:', queryParams.id);

        if (!queryParams.id || queryParams.id.trim() === '') {
            setTransactions([]);
            setTotalPages(0);
            setCurrentPage(1);
            return; 
        }
        
        // Reset para página 1 quando ID mudar
        setCurrentPage(1);

    }, [queryParams.id]);

    // Efeito para resetar página quando filtros mudarem
    useEffect(() => {
        if (queryParams.id && queryParams.id.trim() !== '') {
            console.log('Filtros mudaram, resetando para página 1:', filters);
            setCurrentPage(1);
        }
    }, [filters, queryParams.id]);

    useEffect(() => {
        if (!queryParams.id || queryParams.id.trim() === '') {
            return;
        }

        const fetchTransactions = async (page: number = 1) => {
                
            try {
                // Construir parâmetros de query baseado nos filtros
                const params = new URLSearchParams();
                params.append('id', `CNPJ_${queryParams.id}`);
                params.append('page', page.toString());

                // Adicionar filtros como parâmetros de query
                if (filters) {
                    // Converter meses de "01", "02" para números "1", "2"
                    if (filters.months.length > 0) {
                        const monthNumbers = filters.months.map(month => parseInt(month, 10).toString());
                        params.append('date', monthNumbers.join(','));
                    }
                    
                    // Converter entrada/saida para 1/2
                    if (filters.transactionType) {
                        const inOutValue = filters.transactionType === 'entrada' ? '1' : '2';
                        params.append('inOut', inOutValue);
                    }
                    
                    // Tipos de pagamento - usar os valores como estão (boleto, ted, pix, sistemico)
                    if (filters.paymentType.length > 0) {
                        params.append('type', filters.paymentType.join(','));
                    }
                    
                    // Clientes - usar como está (agora cliente único)
                    if (filters.client && filters.client.trim() !== '') {
                        params.append('customProv', filters.client);
                    }
                }

                console.log('Filtros recebidos:', filters);
                console.log('Parâmetros de query construídos:', params.toString());

                const apiUrl = `http://127.0.0.1:5001/transactions/list?${params.toString()}`;
                console.log('URL da API com filtros:', apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Dados recebidos:', data);
                
                // Extrair as transações e totalPages da resposta
                setTransactions(data.transactions || []);
                setTotalPages(data.totalPages || 0);
                setCurrentPage(page);
                
            } catch (err) {
                console.error('Erro na requisição:', err);
            }
        };

        fetchTransactions(currentPage);

    }, [queryParams.id, currentPage, filters]);
    
    // Função para navegar para a página anterior
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Função para navegar para a próxima página
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Função para ir para uma página específica
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='flex flex-col w-full p-5 border rounded-2xl bg-white'>

            <h3 className="text-2xl font-semibold mb-4 mt-4 text-center">
                {title} - ({transactions.length} transações)
            </h3>
            <Table>
                <TableHeader className='bg-black'>
                    <TableRow>
                        <TableHead className='text-white font-bold'>Tipo</TableHead>
                        <TableHead className='text-white font-bold'>Cliente/Provedor</TableHead>
                        <TableHead className='text-white font-bold'>Valor</TableHead>
                        <TableHead className='text-white font-bold'>Forma de Pagamento</TableHead>
                        <TableHead className='text-white font-bold'>Data</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction: any, index: number) => (
                        <TableRow key={index} className='border-b-slate-700'>
                            <TableCell className="font-bold">
                                <span className={transaction.inOut === 'Entrada' ? 'text-green-600' : 'text-red-600'}>
                                    {transaction.inOut}
                                </span>
                            </TableCell>
                            <TableCell>{transaction.customProv}</TableCell>
                            <TableCell className="font-semibold">{transaction.value}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            {/* Controles de Paginação */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                        Página {currentPage} de {totalPages}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {/* Botão Anterior */}
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Anterior
                        </Button>

                        {/* Números das páginas */}
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNumber;
                                if (totalPages <= 5) {
                                    pageNumber = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + i;
                                } else {
                                    pageNumber = currentPage - 2 + i;
                                }
                                
                                return (
                                    <Button
                                        key={pageNumber}
                                        variant={currentPage === pageNumber ? "active" : "default"}
                                        size="sm"
                                        onClick={() => handlePageClick(pageNumber)}
                                        className="w-8 h-8 p-0"
                                    >
                                        {pageNumber}
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Botão Próximo */}
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1"
                        >
                            Próximo
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
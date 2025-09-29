'use client';
import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MaturityAccount {
    ID: string;
    FATURAMENTO: string;
    SALDO: string;
    DATA_ABERTURA: string;
    CNAE: string;
    DATA_REFERENCIA: string;
}

interface MaturityTableProps {
    state: string;
}

export const MaturityAccountsTable = ({ state }: MaturityTableProps) => {
    const [accounts, setAccounts] = useState<MaturityAccount[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!state || state.trim() === '') {
            setAccounts([]);
            setTotalPages(0);
            setCurrentPage(1);
            setError(null);
            return;
        }
        
        // Reset para página 1 quando estado mudar
        setCurrentPage(1);
    }, [state]);

    useEffect(() => {
        if (!state || state.trim() === '') {
            return;
        }

        const fetchAccounts = async (page: number = 1) => {
            setLoading(true);
            setError(null);
            
            try {
                const params = new URLSearchParams();
                params.append('state', state);
                params.append('page', page.toString());

                const apiUrl = `/api/maturity/list?${params.toString()}`;
                console.log('Fetching maturity accounts from:', apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Maturity accounts data received:', data);
                
                setAccounts(data.accounts || []);
                setTotalPages(data.totalPages || 0);
                setCurrentPage(page);
                
            } catch (err) {
                console.error('Error fetching maturity accounts:', err);
                setError('Erro ao carregar contas por maturidade');
                setAccounts([]);
                setTotalPages(0);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts(currentPage);

    }, [state, currentPage]);

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

    if (!state) {
        return (
            <div className='flex flex-col w-full p-8 border rounded-2xl bg-white'>
                <div className="text-center text-gray-500">
                    Selecione um estado de maturidade para visualizar as contas associadas.
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className='flex flex-col w-full p-8 border rounded-2xl bg-white'>
                <div className="text-center text-gray-500">
                    Carregando contas para: {state}...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col w-full p-8 border rounded-2xl bg-white'>
                <div className="text-center text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col w-full p-5 border rounded-2xl bg-white'>
            <h3 className="text-2xl font-semibold mb-4 mt-4 text-center">
                Empresas - {state} ({accounts.length} contas)
            </h3>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">Estado de Maturidade:</span> {state}
                </p>
            </div>

            <Table>
                <TableHeader className='bg-black'>
                    <TableRow>
                        <TableHead className='text-white font-bold'>ID Empresa</TableHead>
                        <TableHead className='text-white font-bold'>Faturamento</TableHead>
                        <TableHead className='text-white font-bold'>Saldo</TableHead>
                        <TableHead className='text-white font-bold'>CNAE</TableHead>
                        <TableHead className='text-white font-bold'>Data Abertura</TableHead>
                        <TableHead className='text-white font-bold'>Data Referência</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accounts.map((account: MaturityAccount, index: number) => (
                        <TableRow key={index} className='border-b-slate-700'>
                            <TableCell className="font-semibold">{account.ID}</TableCell>
                            <TableCell className="font-bold text-green-600">{account.FATURAMENTO}</TableCell>
                            <TableCell className="font-bold text-blue-600">{account.SALDO}</TableCell>
                            <TableCell className="text-sm">{account.CNAE}</TableCell>
                            <TableCell>{account.DATA_ABERTURA}</TableCell>
                            <TableCell>{account.DATA_REFERENCIA}</TableCell>
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
    );
};
'use client';

import { Users, ArrowRightLeft, DollarSign } from "lucide-react";
import { Card } from "../../components/card/card";
import { useCnpjID } from "../contexts/cnpj-id";
import { useEffect, useState } from "react";

export function CompanyCards() {
    const { id } = useCnpjID();
    const [cardData, setCardData] = useState({ companies: 0, transactions: 0, total: 0 });

    useEffect(() => {
        console.log('ID do contexto mudou (Cards):', id);

        if (!id || id.trim() === '') {
            setCardData({ companies: 0, transactions: 0, total: 0 });
            return;
        }

        const fetchOverview = async () => {

            try {
                const apiUrl = `http://127.0.0.1:5000/transactions/overview?id=CNPJ_${id}`;

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
                setCardData({
                    companies: data.totalClientes || 0,
                    transactions: data.totalTransacoes || 0,
                    total: data.transactionBalance || 0
                });

            } catch (err) {
                console.error('Erro na requisição:', err);
                setCardData({ companies: 0, transactions: 0, total: 0 });
            }
        };

        fetchOverview();

    }, [id]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 lg:mb-15">
            <Card icon={<Users size={64} className="text-blue-500 sm:w-16 sm:h-16" />} price={cardData.companies}>
                <p className="text-sm sm:text-base">Total de clientes</p>
            </Card>
            <Card icon={<ArrowRightLeft size={64} className="text-green-500 sm:w-16 sm:h-16" />} price={cardData.transactions}>
                <p className="text-sm sm:text-base">Total de transações</p>
            </Card>
            <Card icon={<DollarSign size={64} className="text-yellow-500 sm:w-16 sm:h-16" />} price={cardData.total}>
                <p className="text-sm sm:text-base">Saldo total</p>
            </Card>
        </div>
    );
}
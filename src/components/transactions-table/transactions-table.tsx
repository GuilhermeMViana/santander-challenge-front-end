import { type TransactionTableProps } from './props'
import { mockTransactions } from '@/constants/mockTransactions'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const TransactionsTable = () => {
    //const [transactions, setTransactions] = useState<TransactionTableProps[]>([])
    //const [loading, setLoading] = useState(true)
    //const [error, setError] = useState<string || null>(null)

    /*
    useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Aqui você fará a chamada real da API
        // const response = await fetch('/api/transactions');
        // const data = await response.json();
        // setTransactions(data);
        
        // Por enquanto, simulando uma API com setTimeout
        setTimeout(() => {
          setTransactions(mockTransactions);
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        setError('Erro ao carregar transações');
        setLoading(false);
      }
    };

        fetchTransactions();
    }, []);

    */

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Pagador</TableHead>
                    <TableHead>Recebedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockTransactions.map((transaction) => (
                    <TableRow>
                        <TableCell key={transaction.id} className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.pagador}</TableCell>
                        <TableCell>{transaction.recebedor}</TableCell>
                        <TableCell>{transaction.valor}</TableCell>
                        <TableCell>{transaction.descricao}</TableCell>
                        <TableCell>{transaction.data}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
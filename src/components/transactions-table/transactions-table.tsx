import { type TransactionTableProps } from './props'
import { mockTransactions } from '@/constants/mockTransactions'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const TransactionsTable = ({ title }: TransactionTableProps) => {
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
        
        <div className='flex flex-col w-full p-5 border rounded-2xl bg-white'>
            <h3 className="text-2xl font-semibold mb-4 mt-4 text-center">{title}</h3>
            <Table>
            <TableHeader className='bg-black'>
                <TableRow>
                    <TableHead className="w-[100px] text-white font-bold">ID</TableHead>
                    <TableHead className='text-white font-bold'>Pagador</TableHead>
                    <TableHead className='text-white font-bold'>Recebedor</TableHead>
                    <TableHead className='text-white font-bold'>Valor</TableHead>
                    <TableHead className='text-white font-bold'>Descrição</TableHead>
                    <TableHead className='text-white font-bold'>Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className='border-b-slate-700'>
                        <TableCell className="font-bold">{transaction.id}</TableCell>
                        <TableCell>{transaction.pagador}</TableCell>
                        <TableCell>{transaction.recebedor}</TableCell>
                        <TableCell>{transaction.valor}</TableCell>
                        <TableCell>{transaction.descricao}</TableCell>
                        <TableCell>{transaction.data}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    )
}
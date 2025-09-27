import { Card } from "../card/card"
import { Users, ArrowRightLeft, DollarSign, ChartArea } from 'lucide-react'

export const Stats = () => {
    return (
        <div className="flex justify-around items-center bg-white border rounded-2xl p-6 mb-5">
            <Card icon={<Users />} price="1000">
                <p>Total de Clientes</p>
            </Card>
            <Card icon={<ArrowRightLeft />} price="2500">
                
                <p>Total de Transações</p>
            </Card>
            <Card icon={<DollarSign />} price="R$1.000.000">
                <p>Valor Total Transacionado</p>
            </Card>
            <Card icon={<ChartArea />} price="R$2.500.00,82">
                <p>Faturamento Total</p>
            </Card>
        </div>
    )
} 
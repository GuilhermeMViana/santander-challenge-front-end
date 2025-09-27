import { BarCharts } from "@/components/bar-charts";
import { Card } from "@/components/card/card";
import { Filter } from "@/components/filter";
import { Header } from "@/components/header";
import { TransactionsTable } from "@/components/transactions-table";
import { ArrowRightLeft, DollarSign, Users } from "lucide-react";

export default function () {
    return (
        <div className="max-w-[1400px] my-10 mx-auto">
            <Header />
            <Filter/>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 lg:mb-15">
                <Card icon={<Users size={64} className="text-blue-500 sm:w-16 sm:h-16" />} price={100000}>
                    <p className="text-sm sm:text-base">Total de empresas</p>
                </Card>
                <Card icon={<ArrowRightLeft size={64} className="text-green-500 sm:w-16 sm:h-16" />} price={1789}>
                    <p className="text-sm sm:text-base">Empresas em expansão</p>
                </Card>
                <Card icon={<DollarSign size={64} className="text-yellow-500 sm:w-16 sm:h-16" />} price={1300}>
                    <p className="text-sm sm:text-base">Empresas em declínio</p>
                </Card>
            </div>
            <BarCharts />
            <TransactionsTable/>
        </div>
    )
}
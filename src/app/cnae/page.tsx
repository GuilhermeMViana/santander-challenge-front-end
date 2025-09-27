import { Header } from "@/components/header";
import { PieCharts } from "@/components/pie-charts";
import { TransactionsTable } from "@/components/transactions-table";

export default function CNAE() {
    return (
        <div className="max-w-[1400px] my-10 mx-auto">
            <Header />
            <div className="flex flex-col xl:flex-row gap-5 lg:gap-8">
                <div className="w-full xl:w-1/2">
                    <PieCharts />
                </div>
                <div className="w-full xl:w-1/2">
                    <TransactionsTable title="Últimas transações" queryParams={{ id: '' }} />
                </div>
            </div>
        </div>
    )
}
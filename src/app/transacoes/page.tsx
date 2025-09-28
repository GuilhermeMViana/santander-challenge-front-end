import { BarCharts } from "@/components/bar-charts";
import { Card } from "@/components/card/card";
import { Filter } from "@/components/filter";
import { Header } from "@/components/header";
import { TransactionsTable } from "@/components/transactions-table";
import { ArrowRightLeft, DollarSign, Users } from "lucide-react";
import { CompanyCards } from "../../components/company-cards/company-cards";
import { CompanyTransactions } from "../../components/company-transactions/company-transactions";

export default function Transacoes() {
    return (
        <div className="max-w-[1400px] my-10 mx-auto">
            <Header />
            <Filter/>
            <CompanyCards />
            <BarCharts />

            <CompanyTransactions />
        </div>
    )
}
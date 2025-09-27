import { BarCharts } from "@/components/bar-charts";
import { Card } from "@/components/card/card";
import { Filter } from "@/components/filter";
import { Header } from "@/components/header";
import { TransactionsTable } from "@/components/transactions-table";
import { ArrowRightLeft, DollarSign, Users } from "lucide-react";
import { CompanyCards } from "./company-cards";
import { CompanyTransactions } from "./company-transactions";

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
"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/card/card";
import { Crown, MoveDown, MoveUp, Rocket } from "lucide-react";
import { TransactionsTable } from "@/components/transactions-table";

export default function Home() {
  return (
    <div className="max-w-[1400px] my-10 mx-auto">
      <Header/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-15">
        <Card icon={<Rocket size={64} className="text-blue-500 sm:w-16 sm:h-16"/>} price={100000}>
          <p className="text-sm sm:text-base">Total de empresas</p>
        </Card>
        <Card icon={<MoveUp size={64} className="text-green-500 sm:w-16 sm:h-16"/>} price={1789}>
          <p className="text-sm sm:text-base">Empresas em expansão</p>
        </Card>
        <Card icon={<MoveDown size={64} className="text-red-500 sm:w-16 sm:h-16"/>} price={1300}>
          <p className="text-sm sm:text-base">Empresas em declínio</p>
        </Card>
        <Card icon={<Crown size={64} className="text-yellow-500 sm:w-16 sm:h-16"/>} price={765}>
          <p className="text-sm sm:text-base">Empresas maduras</p>
        </Card>
      </div>
      <TransactionsTable title="Contas"/>
    </div>
  );
}

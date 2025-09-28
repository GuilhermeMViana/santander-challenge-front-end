"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/card/card";
import { Crown, MoveDown, MoveUp, Rocket } from "lucide-react";
import { TransactionsTable } from "@/components/transactions-table";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5001/maturity/overview')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
console.log(data);
  return (
    <div className="max-w-[1400px] my-10 mx-auto">
      <Header/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-15">
        <Card icon={<MoveDown size={64} className="text-red-500 sm:w-16 sm:h-16"/>} price={data.Declínio || 0}>
          <p className="text-sm sm:text-base whitespace-nowrap">Empresas em declínio</p>
        </Card>
        
        <Card icon={<MoveUp size={64} className="text-green-500 sm:w-16 sm:h-16"/>} price={data.Expansão || 0}>
          <p className="text-sm sm:text-base whitespace-nowrap">Empresas em expansão</p>
        </Card>
        
        <Card icon={<Rocket size={64} className="text-blue-500 sm:w-16 sm:h-16"/>} price={data.Iniciante || 0}>
          <p className="text-sm sm:text-base whitespace-nowrap">Empresas iniciantes</p>
        </Card>
        
        <Card icon={<Crown size={64} className="text-yellow-500 sm:w-16 sm:h-16"/>} price={data.Madura || 0}>
          <p className="text-sm sm:text-base whitespace-nowrap">Empresas maduras</p>
        </Card>
      </div>
      <TransactionsTable title="Contas" queryParams={{ id: '' }}/>
    </div>
  );
}
import { Header } from "@/components/header";
import { Card } from "@/components/card/card";
import { Crown, MoveDown, MoveUp, Rocket } from "lucide-react";
import { PieCharts } from "@/components/pie-charts";
import { TransactionsTable } from "@/components/transactions-table";

export default function Home() {
  return (
    <div className="max-w-[1400px] my-10 mx-auto">
      <Header/>
      <div className="flex justify-between mb-15">
        <Card icon={<Rocket size={64} className="text-blue-500"/>} price={100000}>
          <p>Total de empresas</p>
        </Card>
        <Card icon={<MoveUp size={64} className="text-green-500"/>} price={1789}>
          <p>Empresas em expansão</p>
        </Card>
        <Card icon={<MoveDown size={64} className="text-red-500"/>} price={1300}>
          <p>Empresas em declínio</p>
        </Card>
        <Card icon={<Crown size={64} className="text-yellow-500"/>} price={765}>
          <p>Empresas maduras</p>
        </Card>
      </div>
      <div className="flex gap-5">
          <PieCharts />
          <TransactionsTable />
      </div>
    </div>
  );
}

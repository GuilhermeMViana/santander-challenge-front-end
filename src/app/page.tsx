import { Header } from "@/components/header";
import { Card } from "@/components/card/card";
import { Crown, MoveDown, MoveUp, Rocket } from "lucide-react";
import { PieCharts } from "@/components/pie-charts";
import { TransactionsTable } from "@/components/transactions-table";

export default function Home() {
  return (
    <div className="w-full max-w-[1400px] my-4 mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="flex flex-col xl:flex-row gap-5 lg:gap-8">
        <div className="w-full xl:w-1/2">
          <PieCharts />
        </div>
        <div className="w-full xl:w-1/2">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}

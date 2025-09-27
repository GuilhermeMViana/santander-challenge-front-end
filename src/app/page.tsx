import { Header } from "@/components/header";
import { TransactionsTable } from "@/components/transactions-table";

export default function Home() {
  return (
    <div className="max-w-[1400px] my-10 mx-auto">
      <Header/>
      <TransactionsTable/>
    </div>
  );
}

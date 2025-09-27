import { Header } from "@/components/header";
import { BarCharts } from "@/components/bar-charts";
import { LineCharts } from "@/components/line-charts";
import { PieCharts } from "@/components/pie-charts";

export default function Home() {
  return (
    <div className="max-w-[1400px] my-10 mx-auto">
      <Header/>
      <BarCharts/>
      <LineCharts/>
      <PieCharts/>
    </div>
  );
}

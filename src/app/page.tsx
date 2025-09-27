import { Header } from "@/components/header";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <div className="max-w-[1400px] my-10 mx-auto">
      <Header/>
      <Stats/>
    </div>
  );
}

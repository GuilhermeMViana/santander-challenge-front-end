'use client';
import { useState } from "react";
import { Header } from "@/components/header";
import { PieCharts } from "@/components/pie-charts";
import { CNAEFilter } from "@/components/cnae-filter";
import { CNAEAccountsTable } from "@/components/cnae-accounts-table";

export default function CNAE() {
    const [selectedCNAE, setSelectedCNAE] = useState<string>('');

    const handleCNAEFilterChange = (cnae: string) => {
        setSelectedCNAE(cnae);
    };

    return (
        <div className="max-w-[1400px] my-10 mx-auto">
            <Header />

            <div className="flex flex-col xl:flex-row gap-5 lg:gap-8 mb-8">
                <div className="w-full xl:w-1/2">
                    <PieCharts />
                </div>
                <div className="w-full xl:w-1/2 flex flex-col justify-center">
                    <CNAEFilter
                        onFilterChange={handleCNAEFilterChange}
                        selectedCNAE={selectedCNAE}
                    />

                    <CNAEAccountsTable cnae={selectedCNAE} />
                </div>
            </div>


        </div>
    );
}
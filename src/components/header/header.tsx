import Image from "next/image"
import { Button } from "../ui/button"

export const Header = () => {
    return (
        <div className="flex justify-between items-center p-6 mb-5 border rounded-2xl bg-white">
            <Image src="/santander_logo.png" alt="logo santander" height="75" width="75" />
            <div className="flex gap-2.5">
                <Button variant="active" asChild>
                    <a href="/">Visão Geral</a>
                </Button>
                <Button asChild>
                    <a href="/analises">Análise de Perfis</a>
                </Button>
                <Button asChild>
                    <a href="/insights">Insights</a>
                </Button>
                <Button asChild>
                    <a href="/performance">Performance</a>
                </Button>
                <Button asChild>
                    <a href="/dados">Dados Reais</a>
                </Button>
            </div>
        </div>

    )
}
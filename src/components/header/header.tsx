import Image from "next/image"
import { NavButton } from "../nav-button/nav-button"

export const Header = () => {
    return (
        <div className="flex justify-between items-center p-6 mb-5 border rounded-2xl bg-white">
            <Image src="/santander_logo.png" alt="logo santander" height="75" width="75" />
            <div className="flex gap-2.5">
                <NavButton href="/">Visão Geral</NavButton>
                <NavButton href="/transacoes">Transações</NavButton>
            </div>
        </div>

    )
}
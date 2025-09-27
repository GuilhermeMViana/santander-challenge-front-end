// "use client"

// import { useState } from "react"
// import { Search } from "lucide-react"
// import { Input } from "../ui/input"
// import { Button } from "../ui/button"
// import { FilterProps } from "./props"

// export const Filter = ({
//     onSearch,
//     title = "Buscar Clientes",
//     placeholder = "Digite sua pesquisa...",
//     className = ""
// }: FilterProps) => {
//     const [searchTerm, setSearchTerm] = useState("")

//     const handleSearch = (searchTerm: string) => {
//         // Aqui você pode implementar a lógica de busca
//         console.log("Buscando por:", searchTerm);
//         if (onSearch) {
//             onSearch(searchTerm)
//         }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === "Enter") {
//             handleSearch(searchTerm)
//         }
//     }

//     return (
//         <div className={`flex-col items-center gap-3 p-4 mb-5 border rounded-2xl bg-white shadow-sm ${className}`}>
//             <div className="w-full mb-4">
//                 <h2 className="text-lg font-medium text-gray-700">{title}</h2>
//             </div>
//             <div className="flex items-center gap-2">
//                 <Input
//                     type="text"
//                     placeholder={placeholder}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="border-gray-200 focus:border-red-500 focus:ring-red-500/20 flex-1"
//                 />
//                 <Button
//                     variant="default"
//                     onClick={() => handleSearch(searchTerm)}
//                     className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white"
//                 >
//                     <Search className="w-4 h-4 mr-2" />
//                     Buscar
//                 </Button>
//             </div>

//         </div>
//     )
// }

// filter.tsx
"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FilterProps } from "./props"
// ⚠️ Novo: Importar o hook customizado
import { useCnpjID } from "@/app/contexts/cnpj-id" // Ajuste o caminho conforme sua estrutura

export const Filter = ({
    // Removi 'onSearch' e 'placeholder' não usados, simplifiquei a desestruturação
    title = "Buscar Clientes",
    className = ""
}: FilterProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    // ⚠️ Novo: Recupere a função setID do contexto
    const { setID } = useCnpjID(); 

    const handleSearch = () => {
        // Validação básica para garantir que o ID não está vazio
        if (searchTerm.trim()) {
            // ⚠️ Novo: Atualiza o ID no contexto
            setID(searchTerm.trim()); 
            console.log("ID do cliente definido no Context:", searchTerm.trim());
        } else {
            console.warn("Termo de busca vazio. O ID do contexto não foi alterado.");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className={`flex-col items-center gap-3 p-4 mb-5 border rounded-2xl bg-white shadow-sm ${className}`}>
            <div className="w-full mb-4">
                <h2 className="text-lg font-medium text-gray-700">{title}</h2>
            </div>
            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    placeholder="Digite o CNPJ/ID do cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-gray-200 focus:border-red-500 focus:ring-red-500/20 flex-1"
                />
                <Button
                    variant="default"
                    onClick={handleSearch}
                    className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white"
                >
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                </Button>
            </div>
        </div>
    )
}
// ⚠️ cnpj-id.tsx
'use client'; // <-- ADICIONE ESTA LINHA

import { createContext, ReactNode, useState, useContext } from "react"; 
// Você pode precisar de 'useContext' também, dependendo de como você estruturou o arquivo.

// Defina a interface (adaptada da resposta anterior)
interface CnpjIDProps {
    children: ReactNode
}

type CnpjIDData = {
    id: string; 
    setID: (newID: string) => void; 
}

// Crie e exporte o Contexto
export const CnpjIDContext = createContext<CnpjIDData>({
    id: '', 
    setID: () => { /* placeholder */ }
});

// Crie o Provider
export function CnpjIDProvider({ children }: CnpjIDProps) {
    const [id, setID] = useState<string>(''); // Valor inicial vazio
    
    return (
        <CnpjIDContext.Provider value={{ id, setID }}>
            {children}
        </CnpjIDContext.Provider>
    );
}

// Hook Customizado (Opcional, mas útil)
export const useCnpjID = () => useContext(CnpjIDContext);

export default CnpjIDProvider;
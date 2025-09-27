import { CardProps } from "./props"

export const Card = ( {icon, price, children}: CardProps ) => {
    return(
        // TODO: Corrigir o código para não mudar o tamanho do card dependendo do texto
        <div className="flex flex-col border rounded-2xl p-3 items-center">
            <div className="mb-2">
                {icon}
            </div>
            <p className="font-bold text-3xl mb-2">
                {price}
            </p>
            <div className="">
                {children}
            </div>
        </div>
    )
}
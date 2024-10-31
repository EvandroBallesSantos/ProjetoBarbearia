"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { db } from "../_lib/prisma"

interface PhoneItemProps {
    phone: string
}

//tipando para usar como parâmetro.
interface BarbershopPageProps {
    params: {
        id: string
    }
}

const PhoneItem = ({ phone }: PhoneItemProps) => {

    //chamando a barbearia do meu banco de dados.
    const getBarbershopProps = async ({ params }: BarbershopPageProps) => {
        const barbershop = await db.barbershop.findUnique({
            where: {
                id: params.id
            },
        })
    
        if (!barbershop) {
            return <h1>Barbearia não encontrada!</h1>
        }
    }
    console.log(getBarbershopProps)

    // Função botão copiar telefone.
    const handleCopyPhoneClick = (phone: string) => {
        navigator.clipboard.writeText(phone)
    }

    return (
        <div className="flex items-center justify-between" key={phone}>
            {/* ESQUERDA */}
            <div className="flex items-center gap-2">
                <SmartphoneIcon/>
                <p className="text-sm">{phone}</p>
                    {/* {getBarbershopProps} */}
            </div>
            {/* DIREITA */}
            <Button variant="outline" size="sm" onClick={() => handleCopyPhoneClick(phone)}>Copiar</Button>
                {/* <div>
                    <Button variant="outline" size="sm" onClick={() => handleCopyPhoneClick(phone)}>Copiar</Button>
                </div> */}
        </div>
    )
}

export default PhoneItem
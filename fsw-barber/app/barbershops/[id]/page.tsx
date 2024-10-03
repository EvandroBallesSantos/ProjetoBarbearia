import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

//tipando para usar como parâmetro.
interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {

    //chamando a barbearia do meu banco de dados.
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        // adicionando a tabela services da barbearia em questão lá do banco de dados.
        include: { 
            services: true
        }
    })

    if (!barbershop) {
        return <h1>Barbearia não encontrada!</h1>
    }

    return (
        <div>
            {/* IMAGEM DA BARBARIA */}
            <div className="relative h-[250px] w-full">
                <Image src={barbershop?.imageUrl} alt={barbershop.name} fill className="object-cover"></Image>
            </div>

            {/* BOTÃO VOLTAR */}
            <Button className="absolute left-4 top-4" size="icon" variant="secondary" asChild>
                <Link href="/">
                    <ChevronLeftIcon/>
                </Link>
            </Button>
            {/* BOTÃO DE MENU */}
            <Button className="absolute right-4 top-4" size="icon" variant="secondary">
                <MenuIcon/>
            </Button>
            
            <div className="p-5 border-b border-solid">
                <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
                <div className="flex gap-1 mb-2">
                    <MapPinIcon className="text-primary"/>
                    <p className="text-sm size[18] text-neutral-400">{barbershop?.address}</p>
                </div>
                <div className="flex gap-1">
                    <StarIcon className="text-primary fill-primary"/>
                    <p className="size[18] text-neutral-400">5,0 (79 avaliações)</p>
                </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className="p-5 border-b border-solid space-y-2">
                <h2 className="font-bold uppercase text-neutral-300">Sobre nós</h2>
                <p className="text-sm text-neutral-400 text-justify">{barbershop?.description}</p>
            </div>

            {/* SERVIÇOS */}
            <div className="p-5 space-y-3">
                <h2 className="font-bold uppercase text-neutral-300">Serviços</h2>
                <div className="space-y-3">
                    {barbershop.services.map(service => <ServiceItem key={service.id} service={service}/>)}
                </div>
            </div>

        </div>
    )
}

export default BarbershopPage;
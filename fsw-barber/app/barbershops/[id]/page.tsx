// import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarButton from "@/app/_components/sidebar-button";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, SmartphoneIcon, StarIcon } from "lucide-react";
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
        // adicionando a tabela services da barbearia em questão, lá do banco de dados.
        include: { 
            services: true
        }
    })

    if (!barbershop) {
        return <h1>Barbearia não encontrada!</h1>
    }

    // const handleCopyPhoneClick = () => {
    //     return (event: React.MouseEvent) => {
    //         navigator.clipboard.writeText(barbershop.phones[0]);
    //         alert("Número copiado com sucesso!");
    //     }
    // }

    // barbershop.phones[0] 
    // navigator.clipboard.writeText(phone);
    // alert("Número copiado com sucesso!");
    // onClick="handleCopyPhoneClick()"

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
                <SidebarButton/>
            </Button>
            
            {/* TÍTULO */}
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
            <div className="p-5 space-y-3 border-b border-solid">
                <h2 className="font-bold uppercase text-neutral-300">Serviços</h2>
                <div className="space-y-3">
                    {barbershop.services.map((service) => (
                        <ServiceItem
                        key={service.id}
                        barbershop={barbershop}
                        service={service}
                        />
                    ))}
                </div>
            </div>

            {/* CONTATO */}
            <div className="p-5">
                <div className="p-5 uppercase">
                    Contato
                </div>
                <div className="flex px-3 justify-between">
                    <div className="flex items-center gap-2">
                        <SmartphoneIcon/>
                        {barbershop.phones}
                    </div>
                    <div>
                        <Button>Copiar</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BarbershopPage;
import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
    service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-3 border-b border-solid">
                    {/* IMAGEM */}
                    <div className=" relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image alt={service.name} fill src={service.imageUrl} className="object-cover rounded-lg"/>
                    </div>
                    {/* DESCRIÇÃO DOS SERVIÇOS */}
                        <div className="space-y-2">
                            <h3 className=" text-sm font-semibold">{service.name}</h3>
                            <p className="text-sm text-neutral-400">{service.description}</p>
                            {/* PREÇO E BOTÃO */}
                            <div className="flex items-center justify-between ">
                                <p className="text-sm font-bold text-primary">
                                    {/* usando API do javascript para formatar a moeda desejada. */}
                                    {Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(Number(service.price))}
                                </p>
                                <Button className="" variant="secondary">Reservar</Button>
                            </div>
                        </div>
            </CardContent>
        </Card>
    
    )       
}

export default ServiceItem;
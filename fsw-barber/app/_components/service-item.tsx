"use client"

import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, set, setHours } from "date-fns";
import { ptBR } from "date-fns/locale"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createBooking } from "../_actions/create-boocking";

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const {data} = useSession()
    const [selectedDay, setSelectedDay] = useState<Date | any>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    console.log({ data })

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay ||!selectedTime) return
        const hour = Number(selectedTime.split(":")[0])
        const minute = Number(selectedTime.split(":")[1])
        const newDate = set(selectedDay, {
            minutes: minute,
            hours: hour,
        })
        await createBooking({
            serviceId: service.id,
            userId: (data?.user as any).id,
            dateTime: newDate,
        })
        // toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.error(error)
            // toast.error("Erro ao criar reserva!")
        }
    }

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
                                
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="secondary" size="sm">
                                            Reservar
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="px-0">
                                        <SheetHeader>
                                            <SheetTitle>
                                                Fazer Reserva
                                            </SheetTitle>
                                        </SheetHeader>
                                        <div className="border-b border-solid py-5">
                                            <Calendar
                                                mode="single"
                                                locale={ptBR}
                                                selected={selectedDay}
                                                onSelect={handleDateSelect}
                                                styles={{
                                                    head_cell: {
                                                        width: "100%",
                                                        textTransform: "capitalize",
                                                    },
                                                    cell: {
                                                        width: "100%",
                                                    },
                                                    button: {
                                                        width: "100%",
                                                    },
                                                    nav_button_previous: {
                                                        width: "32px",
                                                        height: "32px",
                                                    },
                                                    nav_button_next: {
                                                         width: "32px",
                                                        height: "32px",
                                                    },
                                                    caption: {
                                                        textTransform: "capitalize",
                                                    },
                                                }}
                                            />
                                        </div>
                                        {selectedDay && selectedDay && (
                                            <div className="flex border-b border-solid p-5 overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
                                            {TIME_LIST.map(time => 
                                                <Button 
                                                key={time}
                                                variant={selectedTime === time ? "default" : "outline"}
                                                className="rounded-full"
                                                onClick={() => handleTimeSelect(time)}
                                                >
                                                    {time}
                                                </Button>)}
                                        </div>
                                        )}
                                        {selectedTime &&  (
                                            <div className="p-5">
                                                <Card>
                                                    <CardContent className="p-3 space-y-3">
                                                        {/* Serviço e Preço */}
                                                        <div className="flex justify-between items-center">
                                                            <h2>{service.name}</h2>
                                                            <p className="text-sm font-bold">
                                                                {Intl.NumberFormat("pt-BR", {
                                                                    style: "currency",
                                                                    currency: "BRL",
                                                                }).format(Number(service.price))}
                                                            </p>
                                                        </div>

                                                        {/* Data */}
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray">Data</h2>
                                                            <p className="text-sm text-gray">
                                                                {format(selectedDay, "d 'de' MMMM", {
                                                                    locale: ptBR,
                                                                })}
                                                            </p>
                                                        </div>

                                                        {/* Data */}
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray">Horário</h2>
                                                            <p className="text-sm text-gray">
                                                                {selectedTime}
                                                            </p>
                                                        </div>

                                                        {/* Barbearia e Serviço */}
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray">
                                                                Barbearia
                                                            </h2>
                                                            <p className="text-sm text-gray">
                                                                {barbershop.name}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                            </Card>
                                            </div>
                                        )}
                                        {/* Botão Confirmar */}
                                        <SheetFooter className="px-5 mt-5">
                                            <SheetClose asChild>
                                                <Button
                                                onClick={handleCreateBooking}
                                                disabled={!selectedDay || !selectedTime}
                                                >
                                                    Confirmar
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
            </CardContent>
        </Card>
    
    )       
}

export default ServiceItem;
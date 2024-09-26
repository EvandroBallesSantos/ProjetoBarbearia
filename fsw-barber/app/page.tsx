import Image from "next/image"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { Badge } from "./_components/ui/badge"
import Header from "./_components/ui/header"
import {
  EyeIcon,
  FootprintsIcon,
  Hand,
  PaintbrushIcon,
  SearchIcon,
} from "lucide-react"
import { Card, CardContent } from "./_components/ui/card"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import BarbershopItem from "./_components/ui/barbarshop-item"
import { db } from "./_lib/prisma"

// SERVER COMPONET
const Home = async () => {
  // chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header></Header>

      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá Evandro!</h2>
        <p>Segunda-feira, 16 de setembro.</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..."></Input>
          <Button>
            <SearchIcon></SearchIcon>
          </Button>
        </div>

        {/* Botões de busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant={"secondary"}>
            <Image
              className="mr-1"
              src="/cabelo.svg"
              width={16}
              height={16}
              alt="cabelo"
            ></Image>
            Cabelo
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image
              className="mr-1"
              src="/barba.svg"
              width={16}
              height={16}
              alt="barba"
            ></Image>
            Barba
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image
              className="mr-1"
              src="/acabamento.svg"
              width={16}
              height={16}
              alt="acabamento"
            ></Image>
            Acabamento
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <FootprintsIcon size={16}></FootprintsIcon>
            Pézinho
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <EyeIcon size={16}></EyeIcon>
            Sobrancelha
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <PaintbrushIcon size={16}></PaintbrushIcon>
            Pintura
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Hand size={16}></Hand>
            Massagem
          </Button>
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Banner01"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          ></Image>
        </div>

        {/* AGENDAMENTO */}
        <h2 className="text-gray-400 mb-3 mt-6 text-xs font-bold uppercase">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png"></AvatarImage>
                </Avatar>
                <p className="text-sm">Barbearia StyleBarber</p>
              </div>
            </div>
            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="test-sm">Setembro</p>
              <p className="text-2xl">16</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        {/* BarbershopItem Recomendados */}
        <h2 className="text-gray-400 mb-3 mt-6 text-xs font-bold uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            ></BarbershopItem>
          ))}
        </div>

        {/* BarbershopItem Populares */}
        <h2 className="text-gray-400 mb-3 mt-6 text-xs font-bold uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            ></BarbershopItem>
          ))}
        </div>
      </div>
      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-gray-400 text-sm">
              @ 2024 Copyright <span className="font-bold">Evandro Balles</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home

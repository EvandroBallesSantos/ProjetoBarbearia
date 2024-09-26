import Image from "next/image"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { Badge } from "./_components/ui/badge"
import Header from "./_components/ui/header"
import { SearchIcon } from "lucide-react"
import { Card, CardContent } from "./_components/ui/card"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import BarbershopItem from "./_components/ui/barbarshop-item"
import { db } from "./_lib/prisma"

// SERVER COMPONET
const Home = async () => {
  // chamar banco de dados
  const barbershops = await db.barbershop.findMany({})

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

        {/* BarbershopItem */}
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
      </div>
    </div>
  )
}

export default Home

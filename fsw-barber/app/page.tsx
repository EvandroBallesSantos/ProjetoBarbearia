import Image from "next/image"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import { SearchIcon } from "lucide-react"
import { Card, CardContent } from "./_components/ui/card"
import BarbershopItem from "./_components/barbershop-item"
import { db } from "./_lib/prisma"
import { QuickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"

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
        <div className="mt-6">
          <Search/>
        </div>

        {/* Botões de busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {QuickSearchOptions.map((options) => (
            <Button className="gap-2" variant={"secondary"} key={options.title}>
              <Image
                className="mr-1"
                src={options.imageUrl}
                width={16}
                height={16}
                alt={options.title}
              ></Image>
              {options.title}
            </Button>
          ))}

          {/*
          <Button className="gap-2" variant={"secondary"}>
            <Image
              className="mr-1"
              src="/hidratacao.svg"
              width={16}
              height={16}
              alt="hidratação"
            ></Image>
            Hidratação
          </Button> */}
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
        <BookingItem></BookingItem>

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
    </div>
  )
}

export default Home

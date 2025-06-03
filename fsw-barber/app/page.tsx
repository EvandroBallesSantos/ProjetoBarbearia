import React from 'react'
import Image from "next/image"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import BarbershopItem from "./_components/barbershop-item"
import { db } from "./_lib/prisma"
import { QuickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"


// SERVER COMPONET
const Home = async () => {
  // chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })


  const now = new Date()
  // const datetime = now.toLocaleDateString()
  const datetime = now.toUTCString()

  return (
    <div>
      <Header></Header>

      {/* Se tiver sogado renderizar */}
      {/* {data?.user ? (
                <div className="p-5"> */}
        {/* TEXTO */}
        {/* <h2 className="text-xl font-bold">Olá {data?.user?.name}!</h2>
        <p>{datetime}</p>

        </div>
              ) : (
                <div className="p-5"> */}
        {/* TEXTO */}
        {/* <h2 className="text-xl font-bold">Olá Desconhecido!</h2>
        <p>{datetime}</p>

        </div>
        )} */}

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá {}!</h2>
        <p>{datetime}</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search/>
        </div>

        {/* Botões de busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {QuickSearchOptions.map((options) => (
            <Button className="gap-2" variant={"secondary"} key={options.title} asChild>
              <Link href={`/barbershops?service=${options.title}`}>
              <Image
                className="mr-1"
                src={options.imageUrl}
                width={16}
                height={16}
                alt={options.title}
              ></Image>
              {options.title}
              </Link>
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
        {/* <div className="relative mt-6 h-[150px] w-full"> */}
        <div className="relative rounded-xl mt-6 h-40 sm:h-48 md:h-56 lg:h-64">
          <Image alt="Banner01" src="/banner-01.png" fill className="rounded-xl object-cover h-full w-full">
          </Image>
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

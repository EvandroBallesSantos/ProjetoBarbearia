"use client" //Pois estou usando onClick do javascript.

import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { QuickSearchOptions } from "../_constants/search"
import Link from "next/link"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SigInDialog from "./sign-in-dialog"

const SidebarButton = () => {

  const { data } = useSession()

  
  // Função deslogar da conta importando o signOut do next-auth.
  const handleLogoutClick = () => signOut()

    return (
        <Sheet>
          {/* Botão de Menu Lateral do Header */}
          <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon></MenuIcon>
          </Button>
          </SheetTrigger>

          {/* Conteúdo da janela lateral */}
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {/* Avatar do Usuário */}
            <div className="flex items-center justify-between py-5 border-b border-solid gap-3">
              
              {/* Se tiver sogado renderizar */}
              {data?.user ? (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={data?.user?.image ?? ''}/>
                  </Avatar>
                  <div className="">
                    <p className="font-bold">{data.user.name}</p>
                    <p className="text-xs">{data.user.email}</p>
                  </div>
                </div>
              ) : (
                // Caso não esteja logado renderizar
                <>
                  <h2 className="font-bold">Olá, faça seu login!</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <LogInIcon size={18}/>
                      </Button>
                    </DialogTrigger>
                    <SigInDialog/>
                  </Dialog>
                </>
              )}

            </div>

            {/* Botões Início e Agendamentos */}
            <div className="flex flex-col gap-2 py-5 border-b border-solid">
              {/* Link para a página Início e SheetClose: usado para fechar ao clicar no que estiver dentro */}
              <SheetClose asChild>
                  <Button className="justify-start gap-2" variant="ghost" asChild>
                    <Link href="/">
                      <HomeIcon size={18}/>
                      Início
                    </Link>
                  </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18}/>
                Agendamentos
              </Button>
              
            </div>

            {/* Botões Categorias: cabelo, barba, acabamento, Sobrancelha... */}
            <div className="flex flex-col gap-2 py-5 border-b border-solid">
              Serviços:
              {/* Usando a constante categorias */}
              {QuickSearchOptions.map((option) => ( /* para cada options vai renderizar o que está abaixo */
                <SheetClose key={option.title} asChild>
                  <Button className="justify-start gap-2" variant="ghost" asChild>
                    <Link href={`/barbershops?service=${option.title}`}>
                     <Image src={option.imageUrl} height={18} width={18} alt={option.title}/>
                     {option.title}
                    </Link>
                  </Button>
                </SheetClose>
              ))}
            </div>

            {/* Botão de Logout */}
            {data?.user && (
              <div className="flex flex-col gap-2 py-5">
                <Button variant="ghost" className="justify-start gap-2" onClick={handleLogoutClick}>
                  <LogOutIcon />
                  Sair da Conta
                </Button>
              </div>
            )}

          </SheetContent>
        </Sheet>
    );
}

export default SidebarButton;
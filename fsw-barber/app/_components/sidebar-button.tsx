"use client" //Pois estou usando onClick do javascript.

import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { QuickSearchOptions } from "../_constants/search"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarButton = () => {

  const { data } = useSession()

  // Função logar importando o signIn do next-auth e indicando qual provider estou usando.
  const  handleLoginWithGoogleClick = () => signIn("google")
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
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Faça o login na plataforma</DialogTitle>
                        <DialogDescription>
                          Conecte-se usando sua conta do Google
                        </DialogDescription>
                      </DialogHeader>
                      <Button variant="outline" className="font-bold gap-1" onClick={handleLoginWithGoogleClick}>
                        <Image src="/google.svg" width={18} height={18} alt="fazer login com o google"/>
                        Google
                      </Button>
                    </DialogContent>
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
              {/* Usando a constante categorias */}
              {QuickSearchOptions.map((option) => ( /* para cada options vai renderizar o que está abaixo */
                <Button key={option.title} className="justify-start gap-2" variant="ghost">
                <Image src={option.imageUrl} height={18} width={18} alt={option.title}/>
                {option.title}
              </Button>
              ))}
            </div>

            {/* Botão de Logout */}
            <div className="flex flex-col gap-2 py-5">
              <Button variant="ghost" className="justify-start gap-2" onClick={handleLogoutClick}>
              <LogOutIcon />
                Sair da Conta
              </Button>
            </div>

          </SheetContent>
        </Sheet>
    );
}

export default SidebarButton;
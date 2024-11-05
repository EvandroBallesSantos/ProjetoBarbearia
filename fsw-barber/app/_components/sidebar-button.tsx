import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { QuickSearchOptions } from "../_constants/search"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const SidebarButton = () => {
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
              <h2 className="font-bold">Olá, faça seu login!</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <LogInIcon size={18}/>
                    Sair
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Faça o login na plataforma</DialogTitle>
                    <DialogDescription>
                      Conecte-se usando sua conta do Google
                    </DialogDescription>
                  </DialogHeader>
                  <Button variant="outline" className="font-bold gap-1">
                    <Image src="/google.svg" width={18} height={18} alt="fazer login com o google"/>
                    Google
                  </Button>
                </DialogContent>
              </Dialog>
              
              
              {/* <Avatar>
                <AvatarImage src="https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png"/>
              </Avatar>
              <div className="">
                <p className="font-bold">Evandro Balles</p>
                <p className="text-xs">evandro_ebs@yahoo.com.br</p>
              </div> */}
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
              <Button variant="ghost" className="justify-start gap-2">
              <LogOutIcon />
                Sair da Conta
              </Button>
            </div>

          </SheetContent>
        </Sheet>
    );
}

export default SidebarButton;
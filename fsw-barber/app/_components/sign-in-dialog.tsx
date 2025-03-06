import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"



const SigInDialog = () => {
    // Função logar importando o signIn do next-auth e indicando qual provider estou usando.
const  handleLoginWithGoogleClick = () => signIn("google")

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Faça o login na plataforma</DialogTitle>
                <DialogDescription>
                    Conecte-se usando sua conta do Google
                </DialogDescription>
            </DialogHeader>
                <Button variant="outline"
                    className="font-bold gap-1"
                    onClick={handleLoginWithGoogleClick}>
                    <Image src="/google.svg" width={18} height={18} alt="fazer login com o google"/>
                    Google
                </Button>
        </DialogContent>
    )
}

export default SigInDialog;
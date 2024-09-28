import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

//TODO: receber agendamento como propiedade
const BookingItem = () => {
    return (
        <>
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

        </>
    )
}

export default BookingItem;
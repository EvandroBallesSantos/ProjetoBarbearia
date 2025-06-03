"use client"

import React from 'react'
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
 
// Schema zod para validar o input do formulário. A busca é obrigatória, com um mínimo de 1 e um máximo de 50 caracteres, e o "trin()" diz que não é para considerar espaços em branco.
const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar!",
  }).max(50),
})

const Search = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  // State para o input de busca e a função para o submit do formulário.
  // const [search, setSearch] = useState("");
  const router = useRouter();

  // Função para o submit do formulário, redirecionando para a página de busca com a query string.
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?title=${data.title}`)
  }

  return (
    <>
        {/* Dessa forma, o formulário acaba sendo renderizado e atualizado a cada digito colocado na 
        barra de busca fazendo com que acabe influenciando na performance da aplicação.
         <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input placeholder="Faça sua busca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          
        </form> */}


      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="flex gap-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Faça sua busca..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <SearchIcon></SearchIcon>
          </Button>
        </form>
      </Form>
    </>
    
  );
}

export default Search;
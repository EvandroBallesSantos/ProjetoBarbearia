import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageParams {
    searchParams: {
        title?: string
        service?: string
    }}

const BarbershopsPage = async ({searchParams}: BarbershopsPageParams) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            OR: [
                searchParams?.title
                ? {
                    name: {
                        contains: searchParams?.title,
                        mode: "insensitive", // para não divergir letras maiusculas de minusculas.
                    }
                }: {},
                searchParams?.service
                ? {
                    services: {
                        some: {
                            name: {
                                contains: searchParams?.service,
                                mode: "insensitive", // para não divergir letras maiusculas de minusculas.
                            }
                        }
                    }
                }: {},
                
            ]           
        }
    })
    // {
    //     name: {
    //         contains: searchParams?.title,
    //         mode: "insensitive", // para não divergir letras maiusculas de minusculas.
    //     }
    // },
    // {
    //     services: {
    //         some: {
    //             name: {
    //                 contains: searchParams?.service,
    //                 mode: "insensitive", // para não divergir letras maiusculas de minusculas.
    //             }
    //         }
    //     }
    // }








    return (
        <div>
            <Header />
            <div className="my-6 px-5">
            <Search />
            </div>
            <div className="px-5">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Resultados para {searchParams?.title || searchParams?.service}
                {/* Resultados para &quot;{searchParams.search}&quot; */}
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {barbershops.map((barbershop) => (
                    <BarbershopItem key={barbershop.id}
                    barbershop={barbershop}/>
                ))}
            </div>
            </div>
        </div>
    );
}

export default BarbershopsPage;
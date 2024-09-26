import { PrismaClient } from "@prisma/client";

declare global {
    var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient()
    }
    prisma = global.cachedPrisma
}

export const db = prisma

// isso garante que apenas uma instancia seja compilada da requisição do banco de dados evitando assim uma sobrecarga da aplicação.
"use server"

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface CreateBookingParams {
    serviceId: string
    dateTime: Date
}

export const createBooking = async (params: CreateBookingParams) => {
    const user = await getServerSession(authOptions)
    if (!user) {
        throw new Error("Você precisa estar logado para fazer reservas.")
    }
    await db.booking.create({
        data: { ...params, userId: (user.user as any).id },
    })
    revalidatePath('/barbershops/[id]')
}
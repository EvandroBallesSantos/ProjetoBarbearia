"use server"

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface getBookingsProps {
    serviceId: string
    dateTime: Date
}

export const getBookings = ({ dateTime }: getBookingsProps) => {
    return db.booking.findMany({
        where: {
            dateTime: {
                lte: endOfDay(dateTime),
                gte: startOfDay(dateTime),
            },
        },
    })
}